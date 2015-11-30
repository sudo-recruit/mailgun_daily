import {
  ROLLBAR_TOKEN
}
from '../config.js'
var rollbar = require("rollbar");
rollbar.init(ROLLBAR_TOKEN,{ environment: "production"});


module.exports.reportMessage=rollbar.reportMessage;