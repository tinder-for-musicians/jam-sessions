require('dotenv').config();
const express = require('express');
const massive = require('massive');
const io = require('socket.io')();
const session = require('express-session');
const authCtrl = require('./controllers/authController');
const instrCtrl = require('./controllers/instrController');
const profileCtrl = require('./controllers/profileController');
const searchCtrl = require('./controllers/searchController');

const {SERVER_PORT, IO_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

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
app.get('/auth/checkuser', authCtrl.checkUser);
// app.get('/api/instruments', instrCtrl.getInstruments);
app.get('/api/instruments', instrCtrl.getAttributes);
app.get('/api/profile/:id', profileCtrl.getProfile);
app.get('/api/search', searchCtrl.searchUsers);
app.post('/api/profile/instrument/:id', profileCtrl.addInstrument);
app.put('/api/profile/picture/:id', profileCtrl.updateProfilePic);
app.put('/api/profile/name/:id', profileCtrl.updateName);
app.put('/api/profile/bio/:id', profileCtrl.updateBio);
app.put('/api/profile/location/:id', profileCtrl.updateLocation);
app.put('/api/profile/instrument/:id', profileCtrl.updateInstrument);
app.delete('/api/profile/instrument/:id', profileCtrl.deleteInstrument);

io.listen(IO_PORT);
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));