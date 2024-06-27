const session = require('express-session')
const sessionMiddleware = 
session({
    secret : "test_secret",
    resave : false,
    saveUninitialized : true
});


module.exports = sessionMiddleware;