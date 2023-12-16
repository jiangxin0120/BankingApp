require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes=require('./routes/transactionRoutes');
const sendRoutes=require('./routes/sendRoutes');
const session = require('express-session');


connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use('/api', userRoutes); // Prefixes all user routes with /api/users
app.use('/auth', userRoutes);      // Prefixes auth routes with /auth
app.use(registerRoutes);// using register routes
app.use(authRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);
app.use(sendRoutes);
// Setting EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files such as images, CSS files, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/', (req, res) => {
  res.render('login');
});





// Setting the port
const PORT = process.env.PORT || 8080;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
