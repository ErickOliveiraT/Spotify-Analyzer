const express = require('express')

const app = express(); 
const router = express.Router();
app.use(express.json())
app.use('/', router);
 
app.get('/', function (req, res) {res.sendStatus(200)})
 
app.listen(4000);
console.log('Listening on port 4000');