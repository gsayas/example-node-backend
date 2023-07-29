const { Profile, Job, Contract} = require('../model');

class BalanceRepository {
    async getClientById(userId) {
        const client = await Profile.findOne({
            where: {
                id: userId,
                type: 'client'
            }
        });

        if (!client) return null;

        return client;
    }

    async totalJobsToPay(clientId) {
        const total = await Job.sum('price', {
            include: [{
                model: Contract,
                as: 'Contract',
                where: { ClientId: clientId },
                required: true
            }],
            where: {
                paid: null
            },
        });

        return total || 0;
    }

    async saveClient(client) {
        await client.save();
    }
}

module.exports = BalanceRepository;
