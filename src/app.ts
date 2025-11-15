import express, { Express } from "express";
import bodyParser from "body-parser";
import sequelize from "./config/prod";
import { getProfile } from "./middleware/getProfile";
import { handleGetContract, handleGetContracts } from "./api/contracts.api";
import { handlePostJob, handleGetUnpaidJobs } from "./api/jobs.api";
import { handleBalanceDeposit } from "./api/balances.api";
import { handleGetBestProfession, handleGetBestClients } from "./api/admin.api";
import { handleGetUsers } from "./api/users.api";

const app: Express = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/*
 * Routes for the API
 */
//Contracts
app.get("/contracts/:id", getProfile, handleGetContract);
app.get("/contracts", getProfile, handleGetContracts);

//Jobs
app.post("/jobs/:job_id/pay", getProfile, handlePostJob);
app.get("/jobs/unpaid", getProfile, handleGetUnpaidJobs);

//Balances
app.post("/balances/deposit/:userId", handleBalanceDeposit);

//Admin
app.get("/admin/best-profession", handleGetBestProfession);
app.get("/admin/best-clients", handleGetBestClients);

//Users
app.get("/users", handleGetUsers);

export default app;
