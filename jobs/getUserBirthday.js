const knexfile = require('../knexfile')
const knex = require('knex')(knexfile['development'])
const send = require('./sendEmail');

module.getUserBirthday = async () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    const users = await knex('users').where(function (qb) {
            qb
            this.whereRaw(`EXTRACT(MONTH FROM users.birthday) = ?`, [month])
                .andWhereRaw(`EXTRACT(DAY FROM users.birthday) = ?`, [day])
        })

    if (users) {
        array.forEach(user => {   
            // only send email in 9 am user timezone      
            const hour = moment.tz(user.location).format('hh');
            if (hour === '09') {  
                send.sendEmail(user)
            }
        });
    }
}