// Global import
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');

// Global Variable
const PORT = process.env.PORT | 2080;

// Load config
dotenv.config({ path: './.env' });

// Connect into database
connectDB();

// Intialize app
const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Initialize express-session to allow us track logged-in user using session
app.use(
    session({
        key: 'user_sid',
        secret: 'jagung_manis',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
        },
    })
);

// Mddleware for check if user cookie is still saved and user is not set, then log out the user
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

//  Import route
const vegetableRoutes = require('./routes/vegetable_routes');
const fruitRoutes = require('./routes/fruit_routes');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');

// Use route
app.use('/api/vegetables', vegetableRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/user', authRoutes);
app.use('/api/user', userRoutes);

// App listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
