const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const app = express();
const db = require('mysql2');
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '3306';
const dbUser = process.env.DB_USER || 'admin';
const dbPass = process.env.DB_PASS || 'admin';
const dbName = process.env.DB_NAME || 'tdc-devops';

const CORS_WHITELIST = [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3006",
];

const corsOptions = {
    // origin: "*", // Accept all origins => Development
    origin: CORS_WHITELIST, // Accept origins in whitelist => Production
    optionsSuccessStatus: 200
};

const connection = db.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`DB Connected! ${dbHost}:${dbPort}/${dbName} with User: ${dbUser}`);
});

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to my API"
    });
});

app.get('/health', (req, res) => {
    res.send({
        status: "OK",
        message: "And how are you?"
    });
});

app.get('/banners', (req, res) => {
    connection.query('SELECT * FROM banners', (err, rows) => {
        if (err) throw err;
        // Mapping dữ liệu trả về từ DB table => Response model
        const banners = rows.map(row => {
            return {
                title: row.title,
                description: row.description,
                image: row.image
            };
        });
        res.send(banners);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});