const {Op} = require("../model");
const getContractsUseCase = require('../usecase/getContractsUseCase');
const getContractDetailsUseCase = require('../usecase/getContractDetailsUseCase');
const ContractsRepository = require('../repository/ContractsRepository');

async function handleGetContract(req, res) {
    const {Contract} = req.app.get('models')
    const {id} = req.params

    const contract = await getContractDetailsUseCase(Contract, id, req);

    if(!contract) return res.status(404).end()
    res.json(contract)
}

async function handleGetContracts(req, res) {
    const contractsRepository = new ContractsRepository();

    try {
        const contracts = await getContractsUseCase(contractsRepository, req.profile.id);
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    handleGetContract,
    handleGetContracts
};