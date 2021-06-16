const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();

//use cors fro all domains

app.all('*', function(req, res, next) {
  var origin =  req.headers.origin ;
  if(origin == null){
    origin = req.headers.referer;
  }
  if(origin == null){
    origin = "*"
  }
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
});

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
//app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/material.route")(app);


  
// simple route
app.get("/", async function(req, res){
	fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        res.send(text);
    });

});

// set port, listen for requests
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});





