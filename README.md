#mailgun_daily
>Mailgun daily report in slack use aws lambda

##create function
```bash
./script/build
./script/create
```

##deploy function
```bash
./script/build
./script/deploy
```

##invoke function
```bash
./script/invoke
```

##config
```js
module.exports.SLACK_WEBHOOK_URL = 'your_slack_webhook_url';
module.exports.ROLLBAR_TOKEN = 'yout_rollbar_token';
module.exports.MAILGUN_PASS = 'yout_mailgun_pass';
module.exports.MAILGUN_DASHBOARD_URL = 'your_mailgun_dashboard_url';
```

MIT