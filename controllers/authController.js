const jwt = require('jsonwebtoken');

// This is a simple login function
exports.login = (req, res) => {
  const { username, password } = req.body;

  // TODO: Replace this with real database user validation
  if (username === 'admin' && password === 'password') {
    const user = { id: 1, username: 'admin' };

    // Sign a JWT token with the user info and secret key from .env
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });  // send token to client
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
