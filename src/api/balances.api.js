const depositToBalanceUseCase = require('../usecase/depositToBalanceUseCase');
const BalanceRepository = require('../repository/balanceRepository');

const balanceRepository = new BalanceRepository();

async function handleBalanceDeposit(req, res){
    const {userId} = req.params;
    const {amount} = req.body;

    try {
        const updatedClient = await depositToBalanceUseCase(balanceRepository, userId, amount);
        res.json(updatedClient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    handleBalanceDeposit
};
