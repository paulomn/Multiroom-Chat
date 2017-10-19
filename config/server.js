
/****************** Modules Import ******************/
/* import express framework */
var express = require("express");
/* import consign */
var consign = require("consign");
/* import body-parser */
var bodyParser = require("body-parser");
/* import express-validator */
var expressValidator = require("express-validator");
/****************** Modules Import ******************/

/* initialize express */
var app = express();

/* assign express views variables */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*configure middlewares (inside request and response)*/
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

/* configura o autoloader */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* output object */
module.exports = app;