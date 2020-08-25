module.exports = {
    getUsers: async (req, res) => {
        const user_id = req.session.user.user_id;
        
        let distance, instrument, level, experience;
        const db = req.app.get('db');

        await db.search.search_users([user_id, distance, instrument, level, experience])
            .then(results => res.status(202).send(results))
            .catch(err => res.status(400).send(err));
    },

    getAttributes: async (req, res) => {
        const db = req.app.get('db');

        await db.instrument.get_attributes()
            .then(response => res.status(200).send(response[0]))
            .catch(() => res.sendStatus(500));
    },

    searchUsers: async (req, res) => {
        const user_id = req.session.user.user_id;
        let {distance, instrument, level, experience} = req.body;
        const db = req.app.get('db');
        
        // coerce empty strings to undefined for SQL arguments, if empty value(s) sent
        // in on req.body (i.e., no value(s) indicated in search query for that field)
        if(distance === '') distance = undefined;
        if(instrument === '') instrument = undefined;
        if(level === '') level = undefined;
        if(experience === '') experience = undefined;

        await db.search.search_users([user_id, distance, instrument, level, experience])
            .then(results => res.status(202).send(results))
            .catch(err => res.status(400).send(err));
    }
}