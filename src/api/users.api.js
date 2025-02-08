
async function handleGetUsers(req, res) {

    try {
        // const contracts = await getContractsUseCase(contractsRepository, req.profile.id);
        res.json(getUsers());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function getUsers() {
    let users = [];

    // delay 1 second (1000ms)
    setTimeout(() => {
        users = [
            { username: 'john', email: 'john@test.com' },
            { username: 'jane', email: 'jane@test.com' },
        ];
    }, 3000);

    return users;
}

module.exports = {
    handleGetUsers
};