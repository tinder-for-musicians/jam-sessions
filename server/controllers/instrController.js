module.exports = {
    getInstruments: async (req, res) => {
        const db = req.app.get('db');

        db.instrument.get_instruments()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(() => res.sendStatus(500));
    }
}