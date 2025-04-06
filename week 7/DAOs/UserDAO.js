const pool = require('../Database/SQLCon');
const { createResponse } = require('../Utilities/createResponse');

class UserDAO {
    constructor() {}

    async create(req) {
        return new Promise((resolve, reject) => {
            pool.run('INSERT INTO users (email, password, fn, sn) VALUES (?, ?, ?, ?)', [...Object.values(req.body)], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(createResponse(true, 'Record Inserted'));
            });
        });
    }

    async getByEmail(req) {
        return new Promise((resolve, reject) => {
            pool.get('SELECT * FROM users WHERE email = ?', [req.body.email], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(createResponse(true, rows));
            });
        });
    }
}

module.exports = UserDAO;