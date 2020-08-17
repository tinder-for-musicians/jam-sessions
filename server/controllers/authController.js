const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {first_name, last_name, username, email, password} = req.body;
    }
}