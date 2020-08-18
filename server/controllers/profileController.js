module.exports = {
    getProfile: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.profile.get_profile([id])
            .then(response => {
                res.status(200).send(response[0]);
            })
            .catch(err => res.status(500).send(err));
    },

    

    getSearchProfiles: async (req, res) => {
        
    }
}