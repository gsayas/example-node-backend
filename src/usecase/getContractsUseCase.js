async function getContractsUseCase(contractsRepository, userId) {
    return await contractsRepository.getOpenContractsForUser(userId);
}

module.exports = getContractsUseCase;
