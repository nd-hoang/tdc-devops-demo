const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const app = express();
const port = process.env.PORT || 3000;

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
    const banners = [
        {
            title: "Makeup <br />Kit 1",
            description: "Ncididunt 1 ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
            image: "/images/banner-img.png"
        },
        {
            title: "Makeup <br />Kit 2",
            description: "Ncididunt 2 ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
            image: "/images/img-1.png"
        },
        {
            title: "Makeup <br />Kit 3",
            description: "Ncididunt 3 ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
            image: "/images/banner-img.png"
        }
    ];
    res.send(banners);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});