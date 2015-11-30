'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.notify = notify;

var _config = require('../config');

var _rollbar = require('./rollbar');

var Slack = require('slack-node');
var _ = require('underscore');

var slack = new Slack();
var empty = function empty() {};

slack.setWebhook(_config.SLACK_WEBHOOK_URL);

function buildAttachments() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	var fields = options.fields || {};
	var attachment = {
		fields: _.mapObject(fields, function (value, key) {
			return {
				title: key,
				value: value,
				short: (value + '').length < 25
			};
		}),
		"color": "#7CD197"
	};

	_.each(['title', 'title_link', 'fallback', 'text'], function (key) {
		if (!!options[key]) {
			attachment[key] = options[key];
		}
	});
	return [attachment];
}

function notify(options) {
	var cb = arguments.length <= 1 || arguments[1] === undefined ? empty : arguments[1];

	var text = options.text || '';
	var attachments = buildAttachments(options);
	slack.webhook({
		channel: "#system",
		username: "澤拉圖",
		icon_emoji: "http://i.imgur.com/h9bJOPw.png",
		text: text,
		attachments: attachments
	}, function (err, response) {
		if (err) {
			console.log('API error:', err);
			(0, _rollbar.reportMessage)(err);
			cb(err, 'something wrong happen:(');
		} else {
			console.log('works normally :)');
			console.log(response);
			cb(null, 'works normally :)');
		}
	});
}