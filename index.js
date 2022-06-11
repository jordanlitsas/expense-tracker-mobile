'use strict';

require('dotenv').config();
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

  app.use(express.static(__dirname + '/public'));


// Sets server port and logs message on success
const listener = app.listen(process.env.PORT || 1337, () => console.log('mobile API is live at ' + listener.address().port));