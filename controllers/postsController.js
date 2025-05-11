const db = require('../db');

// Get all posts
exports.getAllPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};

// Get a post by ID
exports.getPostById = (req, res) => {
  const id = req.params.id;

  // Check if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If no post is found
    if (results.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(results[0]);
  });
};

// Create a new post
exports.createPost = (req, res) => {
  const { title, content, author } = req.body;

  // Ensure required fields are provided
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required.' });
  }

  db.query('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error occurred' });
    }
    res.status(201).json({ message: '✅ Blog post created', id: results.insertId });
  });
};

// Update an existing post
// PATCH /posts/:id
exports.updatePost = (req, res) => {
  const fields = req.body;
  const id = req.params.id;

  // Validate ID
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  // Check if at least one updatable field is provided
  if (!fields.title && !fields.content && !fields.author) {
    return res.status(400).json({ message: 'At least one field (title, content, or author) must be provided.' });
  }

  // Build the SQL query dynamically
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

  values.push(id); // Add ID for WHERE clause

  const sql = `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: '✅ Blog post updated successfully.' });
  });
};

  

// Delete a post
exports.deletePost = (req, res) => {
  const id = req.params.id;

  // Check if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  db.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If no post is deleted
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: '🗑️ Blog post deleted' });
  });
};
