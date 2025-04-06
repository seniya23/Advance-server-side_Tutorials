const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Middleware to parse JSON bodies:
app.use(express.json());

//Custom middleware example to log requests:
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date()}`);
    next();
});

//Define a basic route:
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
});

//Define a route with parameters:
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Fetching user ${userId}` });
});

//Create (POST):
app.post('/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

//Read (GET): To get users type http://localhost:3000/users
// Get all users
app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    res.json(users);
});

// Get specific user
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: 'John Doe' });
});

//Update (PUT):
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({
        message: 'User updated successfully',
        id: userId,
        updates: updatedUser
    });
});

//Delete (DELETE):
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        message: 'User deleted successfully',
        id: userId
    });
});

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});