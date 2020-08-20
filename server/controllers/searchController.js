module.exports = {
    searchUsers: async (req, res) => {
        const {user_id, distance, instrument, level, experience} = req.body;
        const db = req.app.get('db');

        await db.search.search_users([user_id, distance, instrument, level, experience])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    }
}