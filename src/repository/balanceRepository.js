class BalanceRepository {
    async findClient(userId) {
        throw new Error('Not implemented');
    }

    async totalJobsToPay(clientId) {
        throw new Error('Not implemented');
    }

    async saveClient(client) {
        //TODO: should this be here or in a ClientRepository?
        throw new Error('Not implemented');
    }
}

module.exports = BalanceRepository;