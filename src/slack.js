let Slack = require('slack-node');
let _ = require('underscore');

import {
	SLACK_WEBHOOK_URL
}
from '../config'

import {
	reportMessage
}
from './rollbar';
let slack = new Slack();
let empty = function() {};

slack.setWebhook(SLACK_WEBHOOK_URL);

function buildAttachments(options = {}) {
	let fields = options.fields || {};
	let attachment = {
		fields: _.mapObject(fields, function(value, key) {
			return {
				title: key,
				value: value,
				short: (value + '').length < 25
			};
		}),
		"color": "#7CD197"
	};

	_.each(['title', 'title_link', 'fallback', 'text'], function(key) {
		if (!!options[key]) {
			attachment[key] = options[key];
		}
	});
	return [attachment];
}

export function notify(options, cb = empty) {
	let text = options.text || '';
	let attachments = buildAttachments(options);
	slack.webhook({
		channel: "#system",
		username: "澤拉圖",
		icon_emoji: "http://i.imgur.com/h9bJOPw.png",
		text: text,
		attachments: attachments
	}, function(err, response) {
		if (err) {
			console.log('API error:', err);
			reportMessage(err);
			cb(err, 'something wrong happen:(');
		} else {
			console.log('works normally :)');
			console.log(response)
			cb(null, 'works normally :)');
		}
	});
}