require('dotenv').config();
const express = require('express');
const massive = require('massive');
const io = require('socket.io')();
const authCtrl = require('./controllers/authController');
const instrCtrl = require('./controllers/instrController');
const profileCtrl = require('./controllers/profileController');

const {SERVER_PORT, IO_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('Database Connected');
}).catch(err => console.log(err));

io.on('connection', (client) => {
    console.log('A user has connected');
    client.on('chatMessage', (msg) => {
        console.log(msg);
        io.emit('chatMessage', msg);
    });
    client.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/api/instruments', instrCtrl.getInstruments);
app.get('/api/profile/:id', profileCtrl.getProfile);

io.listen(IO_PORT);
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));