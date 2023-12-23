const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;``
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();
const dotenv = require('dotenv');

// load env variables to the file
dotenv.config();

// initialize passport
app.use(passport.initialize());

const db = require('./config/mongoose');

// add middlewares to parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded());

// allow the use of static files (css etc.)
app.use(express.static('./assets'));

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(process.env.PORT, function(err){
    if(err){
        console.error('Error in connecting to server', err);
    }
    console.log('Connected to port : ', process.env.PORT);
});