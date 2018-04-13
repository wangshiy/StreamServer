const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
// this is to hosting static files
app.use(express.static(path.join(__dirname, 'public')));
// this is to get req.body data from http request
app.use(bodyParser.json()); 

/*
// this is to set cookie for every request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  var cookie = req.cookies.sessionId;
  console.log('cookie', cookie);
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2,randomNumber.length);
    res.cookie('sessionId',randomNumber, { maxAge: 10000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next();
});
*/

app.get('/', function (req, res) {
  res.redirect('index.html');
});

app.post('/login', function (req, res) {
  console.log('/login req', req.cookies, req.body.username, req.body.password);
  var cookie = req.cookies.sessionId;
  var username = req.body.username;
  var password = req.body.password;
  if (username === 'aaa' && password === 'bbb') {
    if (cookie === undefined) {
      // no: set a new cookie
      var randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2,randomNumber.length);
      res.cookie('sessionId',randomNumber, { maxAge: 10000, httpOnly: true }); //maxage is to set how many ms to expire cookie, httpOnly is true then document.cookie will not be able to get cookie
      console.log('cookie created successfully');
    } else {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({status: 'Connected'});
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.clearCookie("sessionId");
    res.status(401).send({error: 'Not Authorized'});
  }
});

app.get('/topic', function (req, res) {
	console.log('/topic cookie', req.cookies);
  var cookie = req.cookies.sessionId;
  if (!cookie) {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send({error: 'Cookie timeout'});
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send({name: Math.round(Math.random()* 100)});
  }
});

app.get('/haha', function(req,res){
  res.sendFile('/public/tortoise.png', { root: __dirname });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
