const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

app.use(bodyParser.json())
dotenv.config()

require('./dbs/mongo')

app.use('/', require('./routers/index'))

// app.get('/test', (req,res) => {
//     const env = process.env.ENV
//     res.send(env)
// })

module.exports = app;