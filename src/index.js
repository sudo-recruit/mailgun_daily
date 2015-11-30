import {
	getStats
}
from './mailgun';

import {
	notify
}
from './slack';

import {
	reportMessage
}
from './rollbar';

import {
	MAILGUN_DASHBOARD_URL
}
from '../config';

export default function(cb) {
	getStats(function(err, data) {
		if (err === null) {
			let stats = data.stats[0];
			let fields = {};
			fields.accepted = stats.accepted.total;
			fields.delivered = stats.delivered.total;
			fields.failed = stats.failed.permanent.total;
			fields.time = stats.time;
			console.log('=====mailgun start====');
			console.log(fields.accepted);
			console.log('=====mailgun end====');

			notify({
				text: 'Mailgun daily report',
				fields: fields,
				title: 'Current mailgun statistics',
				title_link: MAILGUN_DASHBOARD_URL
			}, cb);
		} else {
			reportMessage(err);
			cb(err, 'something wrong happen:(');
		}
	});
}