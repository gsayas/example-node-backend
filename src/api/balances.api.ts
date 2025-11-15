import { Request, Response } from "express";
import depositToBalanceUseCase from "../usecase/depositToBalanceUseCase";
import { BalanceRepository } from "../repository/BalanceRepository";

const balanceRepository = new BalanceRepository();

export async function handleBalanceDeposit(
  req: Request,
  res: Response
): Promise<void> {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const updatedClient = await depositToBalanceUseCase(
      balanceRepository,
      userId,
      amount
    );
    res.json(updatedClient);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
