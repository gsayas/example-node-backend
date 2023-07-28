async function payForJobUseCase(jobRepository, jobId, profileId) {
    await jobRepository.beginTransaction();

    try {
        const job = await jobRepository.findJobWithContract(jobId);
        console.log('the job', job);

        if (!job) {
            console.log('NOJOB-ERROR', job);
            await jobRepository.rollbackTransaction();
            throw new Error('Job not found');
        }

        if (job.paid) {
            console.log('PAIDJOB-ERROR', job);
            await jobRepository.rollbackTransaction();
            throw new Error('Job has already been paid');
        }

        const client = job.Contract.Client;
        const contractor = job.Contract.Contractor;

        if (client.id !== profileId) {
            console.log('WRONGCLIENT-ERROR', job);
            await jobRepository.rollbackTransaction();
            throw new Error('User does not have permission to pay for this job');
        }

        if (client.balance < job.price) {
            console.log('BALANCE-ERROR', job);
            await jobRepository.rollbackTransaction();
            throw new Error('Insufficient balance');
        }

        client.balance -= job.price;
        contractor.balance += job.price;
        job.paid = true;
        job.paymentDate = new Date();

        await jobRepository.saveProfile(client);
        await jobRepository.saveProfile(contractor);
        await jobRepository.saveJob(job);

        await jobRepository.commitTransaction();

        return job;
    } catch (err) {
        console.log('GENERIC-ERROR', job);
        await jobRepository.rollbackTransaction();
        throw err;
    }
}

module.exports = payForJobUseCase;
