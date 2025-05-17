const db = require('../db');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM posts');
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const [results] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required.' });
  }

  try {
    const [results] = await db.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    res.status(201).json({ message: '✅ Blog post created', id: results.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error occurred' });
  }
};

// Update an existing post
exports.updatePost = async (req, res) => {
  const fields = req.body;
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  if (!fields.title && !fields.content && !fields.author) {
    return res.status(400).json({ message: 'At least one field (title, content, or author) must be provided.' });
  }

  const updates = [];
  const values = [];

  if (fields.title) {
    updates.push('title = ?');
    values.push(fields.title);
  }
  if (fields.content) {
    updates.push('content = ?');
    values.push(fields.content);
  }
  if (fields.author) {
    updates.push('author = ?');
    values.push(fields.author);
  }

  values.push(id);

  const sql = `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`;

  try {
    const [results] = await db.query(sql, values);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: '✅ Blog post updated successfully.' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const [results] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: '🗑️ Blog post deleted' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
