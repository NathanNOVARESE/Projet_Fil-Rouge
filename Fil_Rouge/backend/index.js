import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- ROUTES AUTH ---
const SECRET = process.env.JWT_SECRET || 'supersecret';

// Inscription
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashed }
    });
    res.json({ message: 'Utilisateur créé', user });
  } catch (error) {
    res.status(400).json({ error: 'Utilisateur ou email déjà pris.' });
  }
});

// Connexion
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

// Utilisateurs
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name, password } = req.body;
  const user = await prisma.user.create({
    data: { email, name, password }
  });
  res.json(user);
});

app.get('/api/users/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ user: null });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(404).json({ user: null });
    res.json({ user });
  } catch (err) {
    return res.status(401).json({ user: null });
  }
});

app.put('/api/users/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.userId;
    const { username, email, bio, avatar, banner } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, email, bio, avatar, banner }
    });
    res.json({ user: updatedUser });
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
});

// Route pour modifier les informations d'un utilisateur par son id (admin ou user lui-même)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, bio, avatar, banner, isAdmin } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) || id },
      data: { username, email, bio, avatar, banner, isAdmin }
    });
    res.json({ user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: "Impossible de mettre à jour l'utilisateur" });
  }
});

app.put('/api/users/me/password', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ error: 'Mot de passe actuel incorrect' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed }
    });
    res.json({ message: 'Mot de passe mis à jour' });
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
});

// Récupérer les infos d'un utilisateur par son id
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) || id }
    });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
});

// Forums
app.get('/forums', async (req, res) => {
  const forums = await prisma.forum.findMany({ include: { owner: true } });
  res.json(forums);
});

app.post('/forums', async (req, res) => {
  const { title, description, ownerId } = req.body;
  const forum = await prisma.forum.create({
    data: { title, description, ownerId }
  });
  res.json(forum);
});

app.put('/forums/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const forum = await prisma.forum.update({
    where: { id },
    data: { title, description }
  });
  res.json(forum);
});

app.delete('/forums/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.forum.delete({ where: { id } });
  res.json({ message: 'Forum supprimé' });
});

// --- ROUTES UPLOAD ---
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Permet d'accéder aux images uploadées via une URL
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(process.cwd(), 'uploads', req.params.filename);
  res.sendFile(filePath);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});

// Supprimer un utilisateur par son id (admin uniquement)
app.delete('/api/users/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    // Optionnel : vérifier si l'utilisateur est admin
    const adminUser = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) || id } });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(400).json({ error: "Impossible de supprimer l'utilisateur" });
  }
});

// Création d'une discussion
app.post('/api/discussions', async (req, res) => {
  const {
    title,
    content,
    game,
    category,
    tags,
    createdAt,
    createdBy
  } = req.body;

  try {
    if (
      !title ||
      !content ||
      !game ||
      !category ||
      !createdBy
    ) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    const tagsString = Array.isArray(tags) ? JSON.stringify(tags) : tags || null;

    // Créer uniquement le topic
    const topic = await prisma.topic.create({
      data: {
        title,
        content,
        game,
        category,
        tags: tagsString,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        createdBy: Number(createdBy)
      }
    });

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erreur lors de la création de la discussion" });
  }
});

app.get('/api/discussions', async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        user: true,
        posts: true
      },
      orderBy: { createdAt: 'desc' }
    });
    // Corrige ici : tags sera TOUJOURS un tableau d'objets {name, color}
    const topicsWithTags = topics.map(topic => {
      let tags = [];
      if (Array.isArray(topic.tags)) {
        tags = topic.tags;
      } else if (typeof topic.tags === "string") {
        try {
          const parsed = JSON.parse(topic.tags);
          // Si c'est un tableau de string, transforme-le en tableau d'objets
          if (Array.isArray(parsed)) {
            tags = parsed.map(tag =>
              typeof tag === "string"
                ? { name: tag, color: "#3B82F6" } // couleur par défaut
                : tag
            );
          }
        } catch {
          // Si c'est une string brute, on la met dans un tableau d'objet
          tags = [{ name: topic.tags, color: "#3B82F6" }];
        }
      }
      return { ...topic, tags };
    });
    res.json(topicsWithTags);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des discussions" });
  }
});

app.get('/api/topics/:topicId/messages', async (req, res) => {
  const { topicId } = req.params;
  try {
    const messages = await prisma.post.findMany({
      where: { topicId: Number(topicId) },
      include: { user: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des messages" });
  }
});

app.post('/api/topics/:topicId/messages', async (req, res) => {
  const { topicId } = req.params;
  const { content, createdBy } = req.body;

  console.log('POST /api/topics/:topicId/messages', {
    topicId,
    body: req.body
  });

  if (!content || !createdBy) {
    return res.status(400).json({ error: "Missing content or createdBy" });
  }
  try {
    const message = await prisma.post.create({
      data: {
        content,
        topicId: Number(topicId),      // Prend l'id de l'URL
        createdBy: Number(createdBy),  // Id de l'utilisateur
        createdAt: new Date()
      },
      include: { user: true }
    });
    res.json(message);
  } catch (error) {
    console.error(error); // Ajoute ce log pour voir l'erreur exacte dans la console
    res.status(500).json({ error: "Erreur lors de la création du message" });
  }
});

app.get('/api/topics/:topicId', async (req, res) => {
  const { topicId } = req.params;
  try {
    const topic = await prisma.topic.findUnique({
      where: { id: Number(topicId) }
    });
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du topic" });
  }
});

app.get('/api/topics', async (req, res) => {
  try {
    const topics = await prisma.topic.findMany();
    res.json(topics); // <-- doit être un tableau ou objet JSON
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des topics" });
  }
});

app.delete('/api/topics/:topicId/:userId', async (req, res) => {
  const { topicId, userId } = req.params;
  const topic = await prisma.topic.findUnique({ where: { id: Number(topicId) } });
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  if (topic.createdBy !== Number(userId)) return res.status(403).json({ error: "Accès refusé" });

  try {
    // Supprime d'abord les posts liés à ce topic
    await prisma.post.deleteMany({ where: { topicId: Number(topicId) } });
    // Puis supprime le topic
    await prisma.topic.delete({ where: { id: Number(topicId) } });
    res.json({ message: "Topic supprimé" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erreur lors de la suppression du topic" });
  }
});

app.put('/api/topics/:topicId', async (req, res) => {
  const { topicId } = req.params;
  const { title, content, tags, userId } = req.body;
  const topic = await prisma.topic.findUnique({ where: { id: Number(topicId) } });
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  if (topic.createdBy !== Number(userId)) return res.status(403).json({ error: "Accès refusé" });

  try {
    await prisma.topic.update({
      where: { id: Number(topicId) },
      data: {
        title,
        content,
        tags: JSON.stringify(tags)
      }
    });
    res.json({ message: "Topic modifié" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la modification du topic" });
  }
});

