module.exports = {
    getUsers: async (req, res) => {
        
        const user_id = req.session.user.user_id;
        
        let distance, instrument, level, experience;
        const db = req.app.get('db');

        await db.search.search_users([user_id, distance, instrument, level, experience])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    },

    searchUsers: async (req, res) => {
        console.log(req.session.user)
        const user_id = req.session.user.user_id;
        console.log(user_id)
        let {distance, instrument, level, experience} = req.body;
        const db = req.app.get('db');
        
        // coerce nulls to undefined for SQL arguments, if null value(s)
        // sent in on req.body (i.e., no value(s) indicated in search query)
        if(distance === null) distance = undefined;
        if(instrument === null) instrument = undefined;
        if(level === null) level = undefined;
        if(experience === null) experience = undefined;

        await db.search.search_users([user_id, distance, instrument, level, experience])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    }
}