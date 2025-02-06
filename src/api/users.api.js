
async function handleGetUsers(req, res) {

    try {
        // const contracts = await getContractsUseCase(contractsRepository, req.profile.id);
        res.json(getUsers());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function getUsers() {
    return [
        { username: 'john', email: 'john@test.com' },
        { username: 'jane', email: 'jane@test.com' },
    ];
}

module.exports = {
    handleGetUsers
};