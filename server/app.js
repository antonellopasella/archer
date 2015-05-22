var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var secret = require('./secret');


app.use(express.static(__dirname + '/../client/app'));

/* SOCKET */
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
server.listen(40000);


var users = {};

io.on('connection', function(socket){
  var user;
  socket.on('anonymous.new', function(data, done){
    console.log("un client ha aperto la pagina", data)
    user = users[data.name] = data;
    console.log("sto per inviare", users);
    io.sockets.emit("users.refresh", users, true);
    done(user);
  });
  socket.on('disconnect', function(){
    if(!user)
      return;
    delete users[user.name];
    console.log("un client disconnesso", user, "sono rimasti", users)


    io.sockets.emit("users.refresh", users, true);
  });
});



//var passport = require('passport')
//  , TwitterStrategy = require('passport-twitter').Strategy;
//app.use(
//  session({
//    secret: 'er908fywe9uifnwerjignsyuvbijkbv zx-laslkdn',
//    resave : false,
//    saveUninitialized : true
//  })
//);

//passport.use(new TwitterStrategy({
//    consumerKey: secret.auth.twitter.TWITTER_CONSUMER_KEY,
//    consumerSecret: secret.auth.twitter.TWITTER_CONSUMER_SECRET,
//    callbackURL: "http://127.0.0.1.xip.io:3000/auth/twitter/callback"
//  },
//  function(token, tokenSecret, profile, done) {
//    done(null, profile);
//  }
//));
//
//app.get('/auth/twitter', passport.authenticate('twitter'));
//app.get('/auth/twitter/callback',
//  passport.authenticate('twitter',
//    {
//      successRedirect: '/index.html?ok',
//      failureRedirect: '/index.html?ko'
//    }
//  )
//);