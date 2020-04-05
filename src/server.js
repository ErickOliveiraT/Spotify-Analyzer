const express = require('express')
const request = require('request')
const querystring = require('querystring')
const stats = require('./stats')
require('dotenv').config();

let app = express();

let redirect_uri = process.env.REDIRECT_URI;

app.get('/', (req,res) => res.sendStatus(200));

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id:  process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read',
      redirect_uri
    }))
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let keys = process.env.CLIENT_ID+':'+process.env.CLIENT_SECRET;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(keys).toString('base64')
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI;
    res.redirect(uri + '?access_token=' + access_token)
  })
});

app.get('/dashboard/:acess_token?', async (req, res) => {
  let token = req.query.access_token;
  if(!token) res.status(401).send('No token provided').end();
  
  let userStats = await stats.getStats(token);
  
  res.status(200).send(userStats).end();
});

let port = process.env.PORT || 4000;
app.listen(port);
console.log(`Listening on port ${port}...`);