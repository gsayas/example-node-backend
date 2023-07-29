const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile');
const {handleGetContract, handleGetContracts} = require('./api/contracts.api');
const {handlePostJob} = require('./api/jobs.api');
const {handleBalanceDeposit} = require('./api/balances.api');
const {handleGetBestProfession} = require('./api/admin.api');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id', getProfile, handleGetContract);
app.get('/contracts', getProfile, handleGetContracts);

app.post('/jobs/:job_id/pay', getProfile, handlePostJob);

app.post('/balances/deposit/:userId', handleBalanceDeposit);

app.get('/admin/best-profession', handleGetBestProfession);

module.exports = app;
