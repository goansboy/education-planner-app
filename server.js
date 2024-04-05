const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();



// Middleware to serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


