const UserDAO = require('../dao/userDao');

class UserService {
    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    error: 'Name, email, and password are required'
                });
            }

            const userId = await UserDAO.createUser({ name, email, password });
            res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: userId,
                    name,
                    email
                }
            });
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await UserDAO.getAllUsers();
            res.json({ data: users });
        } catch (error) {
            console.error('Error in getUsers:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserDAO.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ data: user });
        } catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    error: 'Name, email, and password are required'
                });
            }

            await UserDAO.updateUser(id, { name, email, password });
            res.sendStatus(200);
        } catch (error) {
            console.error('Error in updateUser:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await UserDAO.deleteUser(id);
            res.sendStatus(200);
        } catch (error) {
            console.error('Error in deleteUser:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }
}

module.exports = UserService;