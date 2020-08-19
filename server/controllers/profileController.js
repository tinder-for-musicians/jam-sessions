module.exports = {
    getProfile: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        console.log(+id);
        const results = await db.profile.get_profile([+id])
        console.log(results);
    },

    updateProfilePic: async (req, res) => {
        const {id} = req.params;
    },

    updateName: async (req, res) => {
        const {id} = req.params;
        const {first_name, last_name} = req.body;
        const db = req.app.get('db');

        db.profile.update_name([id, first_name, last_name])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    },

    updateBio: async (req, res) => {
        const {id} = req.params;
        const {bio} = req.body;
        const db = req.app.get('db');

        db.profile.update_bio([id, bio])
            .then(() => {
                res.sendStatus(202);
            })
            .catch(err => res.status(400).send(err));
    },

    updateLocation: async (req, res) => {
        const {id} = req.params;
        const {location} = req.body;
        const db = req.app.get('db');

        db.profile.update_location([id, location])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    },

    addInstrument: async (req, res) => {
        const {id} = req.params;
        const {instrument, level, experience} = req.body;
        const db = req.app.get('db');

        db.profile.add_instrument([id, instrument, level, experience])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    },

    updateInstrument: async (req, res) => {
        const {id} = req.params;
        const {instrument, level, experience} = req.body;
        const db = req.app.get('db');

        db.profile.update_instrument([id, instrument, level, experience])
            .then(() => res.sendStatus(202))
            .catch(err => res.status(400).send(err));
    },

    deleteInstrument: async (req, res) => {
        const {id, instrument} = req.body;
        const db = req.app.get('db');
        
        db.profile.delete_instrument([id, instrument])
            .then(() => {
                res.sendStatus(202);
            })
            .catch(err => res.status(400).send(err));
    },

    getSearchProfiles: async (req, res) => {
        
    }
}