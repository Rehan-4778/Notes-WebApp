const connectToMongo = require('./database');
const express = require('express');
var cors = require('cors')

// function call
connectToMongo();

// express code
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());

// Available routes or endpoints
app.use('/api/auth' , require('./routes/auth'));

app.use('/api/notes' , require('./routes/notes'));

// localy host at given port 
app.listen(port, () => {
 
})
