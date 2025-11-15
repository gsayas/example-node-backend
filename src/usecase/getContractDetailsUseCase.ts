import { ContractsRepository } from "../repository/ContractsRepository";

function getContractDetailsUseCase(
  contractsRepository: ContractsRepository,
  userId: string | number,
  profileId: number
) {
  return contractsRepository.getContractDetails(userId, profileId);
}

export default getContractDetailsUseCase;
