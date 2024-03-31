const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});