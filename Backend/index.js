const express = require('express');
const mysql =require('mysql2')
const cors =require('cors')
const http = require('http')
const dotenv =require('dotenv');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


app.use(cors());
app.use(express.json());
dotenv.config();

//MySQL Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: 'event_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// db.connect((err) =>{
//     if (err) throw err;
//     console.log('Connected successfully')
// });

//user registration
// Assuming you have Express set up
app.post('/register', (req, res) => {
    const { username, password } = req.body; // Get data from the form
    
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    
    // Use MySQL connection to execute query
    connection.execute(query, [username, password], (err, results) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).send('Server error');
        }
        res.send('User registered successfully!');
    });
});

// app.post('/register',(req, res) => {
//     const {username, password} =req.body;
//     const query = "INSERT INTO users (username, password) VALUES (?,?)";
//     db.query(query, [username, password], (err, result) => {
//         if (err) throw err;
//         res.send('User registered successfully');
//     });
// });

//event creation
app.post('/create-event', (req,res) => {
    const {eventName} =req.body;
    const query ="INSERT INTO events(name) VALUES (?)";
    db.query(query, [eventNmae], (err, result) => {
        if (err) throw err;
        res.send('Event created successfully');
    });
});

app.get('/events', (req, res) => {
    const query = "SELECT * FROM events";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});