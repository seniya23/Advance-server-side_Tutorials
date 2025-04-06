const express = require('express');
const UserService = require('./src/controllers/userController');

const app = express();
app.use(express.json());

app.get('/users', UserService.getUsers);

app.get('/users/:id', UserService.getUserById);

app.post('/users', UserService.createUser);

app.put('/users/:id', async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete('/users/:id', async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});