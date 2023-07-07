require('dotenv').config({path: __dirname + '/.env'})
const CronJob = require("node-cron");
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile['development'])
var moment = require('moment-timezone');

const sendEmail = async ({user}) => {
	const url = process.env['endpoint_url']
    const data = {
        "email": user?.email,
        "message": `Hey, ${user?.name} it's your birthday`
    }
    const customHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    console.log(data);

    await fetch(`${url}/send-email`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
	.then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

exports.initScheduledJobs = () => {
  	const scheduledJobFunction = CronJob.schedule("* * * * *", async () => {
		const date = new Date();

		let day = date.getDate();
		let month = date.getMonth() + 1;
		const users = await knex('users').where(function (qb) {
				qb
				this.whereRaw(`EXTRACT(MONTH FROM users.birthday) = ?`, [month])
					.andWhereRaw(`EXTRACT(DAY FROM users.birthday) = ?`, [day])
			})

		if (users.length > 0) {
			users.forEach(async (user) => {
				// only send email in 9 am user timezone      
				const hour = moment.tz(user.location).format('hh');
				if (hour === '03') {
					await sendEmail({user})
				}
			});
		}
  	});

  	scheduledJobFunction.start();
}