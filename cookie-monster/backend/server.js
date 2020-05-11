const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); // creates express server
const port = process.env.PORT || 5000; // port for the server to run on

app.use(cors()); // cors middleware
app.use(express.json()); // allows us to parse JSON (our server will be sending and receiving JSON)

const uri = process.env.ATLAS_URI; // get our connection uri
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}); // connect Mongoose with some parameters to protect against mongoose changes / deprecation
const connection = mongoose.connection;
connection.once('open', () => { // establish the connection
    console.log("MongoDB database connection established successfully");
}); 

const usersRouter = require('./routes/users');
const cookiesRouter = require('./routes/cookies');
const cartRouter = require('./routes/cart');

app.use('/users', usersRouter);
app.use('/cookies', cookiesRouter);
app.use('/cart', cartRouter);

app.listen(port, () => { // starts the server listening on a certain port
    console.log(`server is running on port: ${port}`)
});

