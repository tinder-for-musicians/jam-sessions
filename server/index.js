require('dotenv').config();
const express = require('express');
const massive = require('massive');
const io = require('socket.io')();
const session = require('express-session');
const authCtrl = require('./controllers/authController');
// const instrCtrl = require('./controllers/instrController');
const profileCtrl = require('./controllers/profileController');
const searchCtrl = require('./controllers/searchController');
const matchCtrl = require('./controllers/matchController');
const messageCtrl = require('./controllers/messageController');

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
        io.emit(`chatroom-${msg.chatroom_id}`, msg);
    });
    client.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/checkuser', authCtrl.checkUser);

app.get('/api/search', searchCtrl.getUsers);
app.get('/api/search/attributes', searchCtrl.getAttributes);
app.post('/api/search', searchCtrl.searchUsers);

app.get('/api/profile', profileCtrl.getProfile);
app.post('/api/profile/instrument', profileCtrl.addInstrument);
app.put('/api/profile/picture', profileCtrl.updateProfilePic);
app.put('/api/profile/name', profileCtrl.updateName);
app.put('/api/profile/bio', profileCtrl.updateBio);
app.put('/api/profile/location', profileCtrl.updateLocation);
app.put('/api/profile/coordinates', profileCtrl.updateLatitudeLongitude);
app.put('/api/profile/instrument', profileCtrl.updateInstrument);
app.delete('/api/profile/instrument', profileCtrl.deleteInstrument);

app.get('/api/matches', matchCtrl.getMyMatches);
app.put('/api/matches', matchCtrl.addMatch);
app.delete('/api/matches', matchCtrl.removeMatch);
app.put('/api/matches/block', matchCtrl.blockMatch);
app.get('/api/matches/requests', matchCtrl.getMyMatchRequests);
app.put('/api/matches/decline', matchCtrl.declineMatchRequest);

app.get('/api/messages/:chatroom_id', messageCtrl.getMessages);
app.post('/api/messages', messageCtrl.createMessage);

io.listen(IO_PORT);
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));