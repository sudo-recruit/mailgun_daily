'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.notify = undefined;

var _config = require('../config');

var _rollbar = require('./rollbar');

var slack = require('slack-notify')(_config.SLACK_WEBHOOK_URL);

var notify = exports.notify = slack.extend({
	channel: '#system',
	username: "澤拉圖",
	icon_url: 'http://i.imgur.com/h9bJOPw.png'
});

slack.onError = function (err) {
	console.log('API error:', err);
	(0, _rollbar.reportMessage)(err);
};