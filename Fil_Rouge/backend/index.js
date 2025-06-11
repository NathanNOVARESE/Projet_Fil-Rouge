import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/filrouge', { useNewUrlParser: true, useUnifiedTopology: true });

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

// Topics
app.get('/forums/:forumId/topics', async (req, res) => {
  const { forumId } = req.params;
  const topics = await prisma.topic.findMany({
    where: { forumId },
    include: { createdBy: true }
  });
  res.json(topics);
});

app.post('/forums/:forumId/topics', async (req, res) => {
  const { forumId } = req.params;
  const { title, createdById } = req.body;
  const topic = await prisma.topic.create({
    data: { title, forumId, createdById }
  });
  res.json(topic);
});

app.post('/api/topics', async (req, res) => {
  const { title, forumId, createdBy } = req.body;
  try {
    const topic = await prisma.topic.create({
      data: {
        title,
        forumId: Number(forumId),
        createdBy: Number(createdBy)
      }
    });
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du topic', details: err.message });
  }
});

// Posts
app.get('/topics/:topicId/posts', async (req, res) => {
  const { topicId } = req.params;
  const posts = await prisma.post.findMany({
    where: { topicId },
    include: { author: true }
  });
  res.json(posts);
});

app.post('/topics/:topicId/posts', async (req, res) => {
  const { topicId } = req.params;
  const { content, authorId } = req.body;
  const post = await prisma.post.create({
    data: { content, topicId, authorId }
  });
  res.json(post);
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = await prisma.post.update({
    where: { id },
    data: { content }
  });
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id } });
  res.json({ message: 'Post supprimé' });
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

