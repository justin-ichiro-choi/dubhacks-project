var port = process.env.PORT || 3000;
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
  firebase.database().ref('/math').once('value').then(function(snapshot) {
    var content = snapshot.val()[2];

    res.render('index', {
      photo: content.photo,
      title: content.title,
      time: content.time,
      description: content.description,
      created_at: content.created_at,
      created_by: content.created_by
    });
  });

  
});

app.listen(port);