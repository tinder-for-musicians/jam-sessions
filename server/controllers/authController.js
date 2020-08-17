const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {first_name, last_name, username, email, password} = req.body;

        const db = req.app.get('db');

        const results = await db.auth.get_user([email, username])
        const existingUser = results[0];
        if (existingUser) {
            return res.status(401).send('A user with that username or email is already taken.');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registerUser = await db.auth.register_user([first_name, last_name, username, email, hash]);
        const user = registerUser[0];

        return res.status(200).send(user);
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        const results = await db.auth.login_user([email]);
        const existingUser = results[0];

        if (!existingUser) {
            return res.status(401).send('A user with that email was not found. Please try again.');
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
        }
        const {user_id, first_name, last_name, username} = existingUser;
        return res.status(200).send(user_id, first_name, last_name, username);
    }
}