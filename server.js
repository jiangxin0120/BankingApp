require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
connectDB();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes); // Prefixes all user routes with /api/users
app.use('/auth', userRoutes);      // Prefixes auth routes with /auth

// Setting up the body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Setting EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files such as images, CSS files, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Route to handle login logic
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Here you would handle the login verification
  // For now, we'll just send a basic response
  res.send('Login Logic not implemented');
});



// Setting the port
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
