const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')

app.use(cors());

app.use(logger("dev"));

//Enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));

/*
** Routes
*/

// Authentification routes
var authUserRouter = require("./routes/auth/authUser");
var authControllerRouter  = require("./routes/auth/authController");
app.use("/api/auth/", authUserRouter);
app.use("/api/auth/", authControllerRouter);

// API user routes
app.use("/api/user/", require('./routes/user/userController'));

// API wines routes
app.use("/api/wine/", require('./routes/wine/wineController'));

/*
** Errors Management
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error : err});
});

module.exports = app;
