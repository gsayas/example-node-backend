async function depositToBalanceUseCase(balanceRepository, userId, amount) {
    const client = await balanceRepository.getClientById(userId);
    if (!client) throw new Error('User not found');
    if (amount <= 0) throw new Error('Invalid deposit amount');

    const totalToPay = await balanceRepository.totalJobsToPay(client.id);
    if (!totalToPay) throw new Error('No jobs to pay');

    if (amount > totalToPay * 0.25) throw new Error('Can\'t deposit more than 25% of total jobs to pay');

    client.balance += amount;
    await balanceRepository.saveClient(client);
    return client;
}

module.exports = depositToBalanceUseCase;