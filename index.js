var run = require('./lib/index.js').default;

exports.handler = function(event, context) {
	run(function(err, message) {
		if (err === null) {
			context.succeed(message);
		} else {
			context.err(err);
		}
	});
}

