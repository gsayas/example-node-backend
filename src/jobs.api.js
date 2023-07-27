const { sequelize, Profile, Job, Contract } = require('./model');

async function handlePostJob(req, res) {
    const { job_id } = req.params;
    const t = await sequelize.transaction();

    try {
        const job = await Job.findOne({
            where: { id: job_id },
            include: {
                model: Contract,
                as: 'Contract',
                include: [
                    { model: Profile, as: 'Client' },
                    { model: Profile, as: 'Contractor' }
                ]
            }
        }, { transaction: t });

        if (!job) {
            await t.rollback();
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.paid) {
            await t.rollback();
            return res.status(400).json({ error: 'Job has already been paid' });
        }

        const client = job.Contract.Client;
        const contractor = job.Contract.Contractor;

        if (client.id !== req.profile.id) {
            await t.rollback();
            return res.status(403).json({ error: 'User does not have permission to pay for this job' });
        }

        if (client.balance < job.price) {
            await t.rollback();
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        client.balance -= job.price;
        contractor.balance += job.price;
        job.paid = true;
        job.paymentDate = new Date();

        await client.save({ transaction: t });
        await contractor.save({ transaction: t });
        await job.save({ transaction: t });

        await t.commit();

        res.json(job);
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handlePostJob
};
