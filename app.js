var express = require('express')
, load = require('express-load')
, bodyParser = require('body-parser')
, mongoose = require('mongoose')
, session = require('express-session')
, path = require('path')
, methodOverride = require('method-override')
, cookieParser = require('cookie-parser')
, router = express.Router()
, app = express();

var seed = require('./config/seed')


// Mongo DB
mongoose.connect('mongodb://mongo:27017/presence_db', { poolSize: 10 })
  .then(
  	() => {
  		console.log('Connected to db');
  		// Use na primeira vez para prencher com os dados basicos
  		//seed();	
	},
  	err => console.log('Error in connection')
 );

// Connection global access
global.db = mongoose.connection; 

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname + '/public')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'your secret here'}));
app.use(router);
// End Configuration

load('models').then('controllers').then('routes').into(app);

app.listen(app.get('port'), () => console.log("PresenceWeb Server is Online..."));
