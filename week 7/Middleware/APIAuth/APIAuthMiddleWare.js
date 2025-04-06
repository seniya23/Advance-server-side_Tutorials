const APIKeyService = require('../../Services/ApiKeyService');

const apikeyMiddleware = (req, res, next) => {
    // Your middleware logic here
    next();
};

module.exports = apikeyMiddleware;