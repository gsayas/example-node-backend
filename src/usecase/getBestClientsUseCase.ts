import { BestClientsRepository } from "../repository/BestClientsRepository";

async function getBestClientsUseCase(
  bestClientsRepository: BestClientsRepository,
  start: string,
  end: string,
  limit: number = 2
) {
  if (new Date(end) <= new Date(start)) {
    throw new Error("End date must be greater than start date");
  }

  return await bestClientsRepository.getBestClients(start, end, limit);
}

export default getBestClientsUseCase;
