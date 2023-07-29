const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile');
const {handleGetContract, handleGetContracts} = require('./api/contracts.api');
const {handlePostJob, handleGetUnpaidJobs} = require('./api/jobs.api');
const {handleBalanceDeposit} = require('./api/balances.api');
const {handleGetBestProfession, handleGetBestClients} = require('./api/admin.api');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/*
    * Routes for the API
*/
//Contracts
app.get('/contracts/:id', getProfile, handleGetContract);
app.get('/contracts', getProfile, handleGetContracts);

//Jobs
app.post('/jobs/:job_id/pay', getProfile, handlePostJob);
app.get('/jobs/unpaid', getProfile, handleGetUnpaidJobs);

//Balances
app.post('/balances/deposit/:userId', handleBalanceDeposit);

//Admin
app.get('/admin/best-profession', handleGetBestProfession);
app.get('/admin/best-clients', handleGetBestClients);


module.exports = app;
