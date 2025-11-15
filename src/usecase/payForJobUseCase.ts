import { JobRepository } from "../repository/JobRepository";

async function payForJobUseCase(
  jobRepository: JobRepository,
  jobId: string | number,
  profileId: number
) {
  try {
    await jobRepository.beginTransaction();

    const job: any = await jobRepository.findJobWithContract(jobId);
    if (!job) throw new Error("Job not found");

    if (job.paid) throw new Error("Job has already been paid");

    const client = job.Contract.Client;
    const contractor = job.Contract.Contractor;

    if (client.id !== profileId)
      throw new Error("User does not have permission to pay for this job");

    if (client.balance < job.price) throw new Error("Insufficient balance");

    client.balance -= job.price;
    contractor.balance += job.price;
    job.paid = true;
    job.paymentDate = new Date();

    await jobRepository.saveProfile(client);
    await jobRepository.saveProfile(contractor);
    await jobRepository.saveJob(job);

    await jobRepository.commitTransaction();

    return job;
  } catch (error) {
    await jobRepository.rollbackTransaction();
    throw error;
  }
}

export default payForJobUseCase;
