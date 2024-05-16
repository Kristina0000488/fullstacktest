const cors = require('cors');
const express =  require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/booksRoutes');

const app = express();
const port = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", booksRoutes); 

const server = app.listen(port, "127.0.0.1", () => {
    const host = server.address().address;
    
    console.log('running at http://' + host + ':' + port)
});