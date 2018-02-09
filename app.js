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

// Mongo DB
global.db = mongoose.connect('mongodb://mongo:27017/presence_db');

mongoose.connection.on('connected', function(){
  console.log("Mongoose Connected!");
});

mongoose.connection.on('error', function(err){
  console.log("Error when tried connect to db: "+err);
});


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
