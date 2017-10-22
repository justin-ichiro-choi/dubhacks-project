var express = require('express');
var exphbs  = require('express-handlebars');
var firebase = require("firebase");

var app = express();

var config = {
  apiKey: "AIzaSyAaEMQNbql2Y-GwU2aV2O5TobDBW3SjckM",
  authDomain: "dubhacksproject.firebaseapp.com",
  databaseURL: "https://dubhacksproject.firebaseio.com",
  storageBucket: "dubhacksproject.appspot.com",
  projectId: "dubhacksproject"
};

firebase.initializeApp(config);
var database = firebase.database();


app.use('/css', express.static(`${__dirname}/public/stylesheets`));
app.use('/js', express.static(`${__dirname}/public/javascripts`));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  firebase.database().ref('/').once('value').then(function(snapshot) {
    console.log(snapshot.val(), {
        
      }
    );
  });

  res.render('index');
});

app.listen(3000);