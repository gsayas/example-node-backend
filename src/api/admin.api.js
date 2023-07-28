const bestProfessionUseCase = require('../usecase/bestProfessionUseCase');
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

module.exports = {
    handleGetBestProfession
};
