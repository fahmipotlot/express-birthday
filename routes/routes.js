const express = require('express')
const { user } = require('../controllers')

const app = express()

app.get('/users', user.getUsers)
app.post('/user', user.storeUser)
app.get('/user/:id', user.getUserDetail)
app.put('/user/:id', user.updateUser)
app.delete('/user/:id', user.deleteUser)

module.exports = app;