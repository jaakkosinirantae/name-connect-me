/* This code is from a file called "SophisticatedApp.js" */

// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Creating express app
const app = express();

// Parsing JSON bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/sophisticated_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Define routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Failed to create user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started and listening on port 3000');
});

// ... More code here, additional routes, middleware, etc.