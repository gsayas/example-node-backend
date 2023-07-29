const bestProfessionUseCase = require('../usecase/bestProfessionUseCase');
const getBestClientsUseCase = require('../usecase/getBestClientsUseCase');
const ProfessionRepository = require('../repository/professionRepository');

async function handleGetBestProfession(req, res) {
    const { start, end } = req.query;
    const professionRepository = new ProfessionRepository();

    try {
        const bestProfessions = await bestProfessionUseCase(professionRepository, new Date(start), new Date(end));
        res.json(bestProfessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleGetBestClients(req, res) {
    const { start, end, limit } = req.query;

    try {
        const bestClients = await getBestClientsUseCase(start, end, limit);
        res.json(bestClients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    handleGetBestProfession,
    handleGetBestClients
};
