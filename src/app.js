const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile');
const {handleGetContract} = require('./api/contracts.api');
const {handlePostJob} = require('./api/jobs.api');
const {handleBalanceDeposit} = require('./api/balances.api');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id', getProfile, handleGetContract);

app.post('/jobs/:job_id/pay', getProfile, handlePostJob);

app.post('/balances/deposit/:userId', handleBalanceDeposit);

module.exports = app;
