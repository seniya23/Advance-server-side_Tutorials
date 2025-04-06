const UserDAO = require('../DAOs/UserDAO');
const { generateHash, verifyPassword } = require('../Utilities/bcryptUtility');

class UserService {
    constructor() {
        this.userdao = new UserDAO();
    }

    async create(req) {
        try {
            req.body.password = await generateHash(req.body.password);
            const result = await this.userdao.create(req);
            return result;
        } catch (ex) {
            console.error(ex);
        }
    }

    async validate(req) {
        try {
            const result = await this.userdao.getByEmail(req);
            if (result.success) {
                const isMatch = await verifyPassword(req.body.password, result.data.password);
                if (isMatch) {
                    req.session.user = {
                        id: result.data.id,
                        email: result.data.email
                    };
                    req.session.isAuthenticated = true;

                    return req.session;
                }
                return "Invalid Password";
            }
        } catch (ex) {
            console.error(ex);
        }
    }
}

module.exports = UserService;