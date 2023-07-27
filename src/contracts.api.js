const {Op} = require("./model");

async function handleGetContract(req, res) {
    const {Contract} = req.app.get('models')
    const {id} = req.params

    const contract = await Contract.findOne({
        where: {
            id,
            [Op.or]: [
                { ContractorId: req.profile.id },
                { ClientId: req.profile.id }
            ]
        }
    });

    if(!contract) return res.status(404).end()
    res.json(contract)
}

module.exports = {
    handleGetContract
};