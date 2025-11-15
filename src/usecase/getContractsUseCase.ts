import { ContractsRepository } from "../repository/ContractsRepository";

async function getContractsUseCase(
  contractsRepository: ContractsRepository,
  userId: number
) {
  return await contractsRepository.getOpenContractsForUser(userId);
}

export default getContractsUseCase;
