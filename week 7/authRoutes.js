const express = require('express');
const session = require('express-session');
const usersRoute = require('./Routes/UserRoutes');
const apikeyMiddleware = require('./Middleware/APIAuth/APIAuthMiddleWare');

const app = express();
app.use(express.json()); // Parse any data in the body element into JSON from req object

app.use(session({
    secret: process.env.SESSION_SECRET || 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const PORT_NUMBER = 5000;
app.use('/api', apikeyMiddleware);
app.use('/user', usersRoute);  // Ensure this line is present

// Add a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Advanced Server-Side Web Programming Tutorial!');
});

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER}`);
});

module.exports = app;