module.exports = {
    getMessages: async (req, res) => {
        const user_id = req.session.user.user_id;
        const {chatroom_id} = req.params;
        const db = req.app.get('db');

        await db.messages.get_messages([user_id, chatroom_id])
            .then(response => {
                return res.status(202).send(response);
            })
            .catch(err => res.status(400).send(err));
    },

    createMessage: async (req, res) => {
        const user_id = req.session.user.user_id;
        const {chatroom_id, message} = req.body;
        const db = req.app.get('db');

        await db.messages.create_message([user_id, chatroom_id, message])
            .then(() => {
                return res.sendStatus(202);
            })
            .catch(err => res.status(400).send(err));
    }
}