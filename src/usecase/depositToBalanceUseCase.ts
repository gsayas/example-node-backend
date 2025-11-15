import { BalanceRepository } from "../repository/BalanceRepository";
import { Profile } from "../model";

async function depositToBalanceUseCase(
  balanceRepository: BalanceRepository,
  userId: string | number,
  amount: number
): Promise<Profile> {
  const client = await balanceRepository.getClientById(userId);
  if (!client) throw new Error("User not found");
  if (amount <= 0) throw new Error("Invalid deposit amount");

  const totalToPay = await balanceRepository.totalJobsToPay(client.id);
  if (!totalToPay) throw new Error("No jobs to pay");

  if (amount > totalToPay * 0.25)
    throw new Error("Can't deposit more than 25% of total jobs to pay");

  client.balance = Number(client.balance) + amount;
  await balanceRepository.saveClient(client);
  return client;
}

export default depositToBalanceUseCase;
