const createResponse = (success, data) => {
    return {
        success,
        data
    };
};

module.exports = { createResponse };