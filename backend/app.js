const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const cors = require('cors');
const sessionMiddleware = require('./middleware');

app.use(sessionMiddleware)
app.use(express.json())
app.use(cors());
app.use('/users', userRoutes); // Mount the user router
app.use('/game', gameRoutes)   // Mount the game router

/* Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new Error("PAGE NOT FOUND"));
  });
  
  /* Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;