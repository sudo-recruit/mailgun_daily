'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStats = getStats;

var _config = require('../config');

var moment = require('moment');
var request = require('request');
var url = 'https://api.mailgun.net/v3/mg.sudo.com.tw/stats/total';

function rfc2822(m) {
  return m.format('ddd, D MMM YYYY HH:mm:ss ') + 'GMT';
}

var options = {
  'auth': {
    'user': 'api',
    'pass': _config.MAILGUN_PASS,
    'sendImmediately': false
  },
  qs: {
    event: ['failed', 'delivered', 'accepted'],
    start: rfc2822(moment().subtract(1, 'days'))
  }
};

function getStats(cb) {
  request.get(url, options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(null, JSON.parse(body));
    } else {
      cb(error, response.body);
    }
  });
}