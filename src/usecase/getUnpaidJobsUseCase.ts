import { JobRepository } from "../repository/JobRepository";

async function getUnpaidJobsUseCase(
  jobsRepository: JobRepository,
  userId: number
) {
  return await jobsRepository.getUnpaidJobsForUser(userId);
}

export default getUnpaidJobsUseCase;
