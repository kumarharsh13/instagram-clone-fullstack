const jwt = require('jsonwebtoken');

// Create a token after successful login or registration
const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
