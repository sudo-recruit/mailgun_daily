'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (cb) {
	(0, _mailgun.getStats)(function (err, data) {
		if (err === null) {
			var stats = data.stats[0];
			var fields = {};
			fields.accepted = stats.accepted.total;
			fields.delivered = stats.delivered.total;
			fields.failed = stats.failed.permanent.total;
			fields.time = stats.time;
			console.log('=====mailgun start====');
			console.log(fields.accepted);
			console.log('=====mailgun end====');

			(0, _slack.notify)({
				text: 'Current mailgun statistics',
				fields: fields
			});
			cb(null, 'works normally :)');
		} else {
			(0, _rollbar.reportMessage)(err);
			cb(err, 'something wrong happen:(');
		}
	});
};

var _mailgun = require('./mailgun');

var _slack = require('./slack');

var _rollbar = require('./rollbar');