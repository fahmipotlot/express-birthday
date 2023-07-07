require('dotenv').config({path: __dirname + '/.env'})

const express = require('express')
const app = express()

const scheduledFunctions = require('./jobs');

scheduledFunctions.initScheduledJobs();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const port = 3000

const appRoute = require('./routes/routes');
app.use('/api/v1', appRoute)

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})
