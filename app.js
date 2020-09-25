// Global import
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./database/database');

// Global Variable
const PORT = process.env.PORT | 2080;

// Load config
dotenv.config({ path: './.env' });

// Connect into database
connectDB();

// Intialize app
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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
