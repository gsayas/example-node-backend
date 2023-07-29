const {Op} = require("../model");

function getContractDetailsUseCase(contractsRepository, userId, profileId) {
    return contractsRepository.getContractDetails(userId, profileId);
}

module.exports = getContractDetailsUseCase;