module.exports = {
    getMyMatches: async (req, res) => {
        const id = req.session.user.user_id;
        const db = req.app.get('db');

        await db.matches.get_my_matches([id])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    },

    addMatch: async (req, res) => {
        const id = req.session.user.user_id;
        const {match_id} = req.body;
        const db = req.app.get('db');

        await db.matches.add_match([id, match_id]);

        // check for mutual match
        const users_count = await db.matches.check_mutual_match([id, match_id]);
        const usersCount = +users_count[0].users_count; // N.B. coerce to number
        
        // if mutual match, add chatroom to matches
        if (usersCount === 2) {
            // create new chatroom
            const new_chatroom_id = await db.matches.create_chatroom();
            const newChatroomId = +new_chatroom_id[0].new_chatroom_id;

            // add new chatroom to matched users pair
            await db.matches.add_chatroom([id, match_id, newChatroomId]);

            return res.sendStatus(204);
        } else {
            return res.sendStatus(204);
        }
    },

    // Future-use endpoints (non-MVP)

    removeMatch: async (req, res) => {
        const id = req.session.user.user_id;
        const {username} = req.body;
        const db = req.app.get('db');

        await db.matches.remove_match([id, username])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    },

    blockMatch: async (req, res) => {
        const id = req.session.user.user_id;
        const {username} = req.body;
        const db = req.app.get('db');

        await db.matches.block_match([id, username])
            .then(() => res.status(202).send(`Successfully blocked ${username}`))
            .catch(err => res.status(400).send(err));
    },

    getMyMatchRequests: async (req, res) => {
        const id = req.session.user.user_id;
        const db = req.app.get('db');

        await db.matches.get_my_match_requests([id])
            .then(results => {
                res.status(202).send(results);
            })
            .catch(err => res.status(400).send(err));
    },

    addMatchRequest: async (req, res) => {
        const id = req.session.user.user_id;
        const {username} = req.body;
        const db = req.app.get('db');

        const hasMatched = await db.matches.check_for_match([id, username]);

        if (hasMatched) {
            return res.status(200).send(`${username} has attempted to match with you as well. Check your matches to start messaging!`);
        }

        await db.matches.add_match_request([id, username])
            .then(() => {
                res.sendStatus(202);
            })
            .catch(err => res.status(400).send(err));
    },

    declineMatchRequest: async (req, res) => {
        const id = req.session.user.user_id;
        const {username} = req.body;
        const db = req.app.get('db');

        await db.matches.decline_match_request([id, username])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    }
}