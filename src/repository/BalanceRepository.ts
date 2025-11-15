import { Profile, Job, Contract } from "../model";

export class BalanceRepository {
  async getClientById(userId: string | number) {
    const client = await Profile.findOne({
      where: {
        id: userId,
        type: "client",
      },
    });

    if (!client) return null;

    return client;
  }

  async totalJobsToPay(clientId: number): Promise<number> {
    const total = await Job.sum("price", {
      include: [
        {
          model: Contract,
          as: "Contract",
          where: { ClientId: clientId },
          required: true,
        },
      ],
      where: {
        paid: null,
      },
    } as any);

    return total || 0;
  }

  async saveClient(client: Profile): Promise<void> {
    await client.save();
  }
}
