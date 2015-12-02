import {
  MAILGUN_PASS
}
from '../config';

let moment = require('moment');
let request = require('request');
let url = 'https://api.mailgun.net/v3/mg.sudo.com.tw/stats/total';

function rfc2822(m) {
  return m.format('ddd, DD MMM YYYY HH:mm:ss ') + 'GMT';
}

let options = {
  'auth': {
    'user': 'api',
    'pass': MAILGUN_PASS,
    'sendImmediately': false
  },
  qs: {
    event: ['failed', 'delivered', 'accepted'],
    start: rfc2822(moment().subtract(1, 'days'))
  }
};

export function getStats(cb) {
  request.get(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(null, JSON.parse(body));
    } else {
      cb(error, response.body);
    }
  });
}