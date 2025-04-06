const express = require('express');
const UserService = require('../Services/UserService');
const router = express.Router();

router.post('/register', async (req, res) => {
    const userservice = new UserService();
    const data = await userservice.create(req);
    res.json(data);
});

router.post('/login', async (req, res) => {
    const userservice = new UserService();
    const data = await userservice.validate(req);
    res.json(data);
});

module.exports = router;