const knexfile = require('../knexfile')
const knex = require('knex')(knexfile['development'])
const Joi = require("joi")
const moment = require('moment-timezone');

const timeZones = moment.tz.names();
let offsetTmz = [];

for (var i in timeZones) {
    offsetTmz.push(timeZones[i]);
}

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        location: Joi.string().required().valid(...offsetTmz),
        birthday: Joi.date().required(),
    })
    return schema.validate(user)
}

module.exports = {
    getUsers: async (req,res) => {
        try {
            let users = await knex('users')
            
            res.status(200).json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({'message': e})
        }
    },
    getUserDetail: async (req,res) => {
        try {
            const id = req.params.id
            const user = await knex('users').where('id', id).first()
            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(404).json({'message': e})
        }
    },
    storeUser: async (req,res)=>{
        try {
            const { error } = validate(req.body);
            if (error) throw error.details[0].message;

            const user = await knex('users').where('email', req.body.email).first();
            if (user) throw "Email Already registered";

            const save = await knex('users').insert({
                "name": req.body.name,
                "email": req.body.email,
                "birthday": req.body.birthday,
                "location": req.body.location,
            })

            res.status(201).json(save);
        } catch (e) {
            console.log(e);
            res.status(400).json({'message': e})
        }
    },
    updateUser: async (req,res)=>{
        try {
            const id = req.params.id
            const user = await knex('users').where('id', id).first()
            if (!user) {
               throw 'user not found'
            }
            const { error } = validate(req.body);
            if (error) throw error.details[0].message;

            if (user.email !== req.body.email) {
                const checkUser = await knex('users')
                    .where('id', '!=', id)
                    .where('email', req.body.email)
                    .first()

                if (checkUser) {
                    throw 'email already registered'
                }
            }

            const update = await knex('users').where('id', id).update({
                "name": req.body.name,
                "email": req.body.email,
                "birthday": req.body.birthday,
                "location": req.body.location,
            })

            res.status(200).json(update);
        } catch (e) {
            console.log(e);
            res.status(400).json({'message': e})
        }
    },
}
