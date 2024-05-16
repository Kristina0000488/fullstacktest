const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const mongooseConnection = require('./db');
const booksRoutes = require('./routes/booksRoutes');

const app = express();
const port = 4000;


app.use(cors());
app.use(bodyParser.json());
app.use("/api", booksRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to my Express API!');
});

const server = app.listen(port, "127.0.0.1", () => {
    const host = server.address().address;
    
    console.log('running at http://' + host + ':' + port)
});