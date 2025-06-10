import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});