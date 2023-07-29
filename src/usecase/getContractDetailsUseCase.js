const {Op} = require("../model");

function getContractDetailsUseCase(Contract, id, req) {
    return Contract.findOne({
        where: {
            id,
            [Op.or]: [
                {ContractorId: req.profile.id},
                {ClientId: req.profile.id}
            ]
        }
    });
}

module.exports = getContractDetailsUseCase;