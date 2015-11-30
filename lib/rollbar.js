"use strict";

var _config = require("../config.js");

var rollbar = require("rollbar");
rollbar.init(_config.ROLLBAR_TOKEN, { environment: "production" });

module.exports.reportMessage = rollbar.reportMessage;