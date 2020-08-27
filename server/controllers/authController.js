const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {first_name, last_name, username, email, password, latitude, longitude} = req.body;

        const db = req.app.get('db');

        const results = await db.auth.get_user([email, username]);
        const existingUser = results[0];
        if (existingUser) {
            return res.status(401).send('A user with that username or email is already taken.');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registerUser = await db.auth.register_user([first_name, last_name, username, email, hash, latitude, longitude]);
        const user = registerUser[0];

        req.session.user = user;
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
        
        req.session.user = existingUser;

        return res.status(200).send(existingUser);
    },

    logout: (req, res) => {
        req.session.destroy();

        res.sendStatus(200);
    },

    checkUser: (req, res) => {
        if(req.session && req.session.user) {
            res.sendStatus(200);
        
        }
        else res.sendStatus(404)
    }
}