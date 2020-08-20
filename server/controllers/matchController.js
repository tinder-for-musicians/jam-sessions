module.exports = {
    getMyMatchRequests: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        await db.matches.get_my_match_requests([id])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    },

    addMatchRequest: async (req, res) => {
        const {id} = req.params;
        const {username} = req.body;
        const db = req.app.get('db');

        await db.matches.add_match_request([id, username])
            .then(results => {
                res.sendStatus(202);
            })
            .catch(err => res.status(400).send(err));
    },

    getMyMatches: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        await db.matches.get_my_matches([id])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    },

    removeMatch: async (req, res) => {
        const {id} = req.params;
        const {username} = req.body;
        const db = req.app.get('db');

        await db.matches.removeMatch([id, username])
            .then(() => res.sendStatus(202))
            .catch(err = res.status(400).send(err));
    }
}