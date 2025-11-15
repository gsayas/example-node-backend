import { Request, Response } from "express";
import getContractsUseCase from "../usecase/getContractsUseCase";
import getContractDetailsUseCase from "../usecase/getContractDetailsUseCase";
import { ContractsRepository } from "../repository/ContractsRepository";

export async function handleGetContract(
  req: Request,
  res: Response
): Promise<void | Response> {
  const contractsRepository = new ContractsRepository(req.app.get("sequelize"));
  const { id } = req.params;

  const contract = await getContractDetailsUseCase(
    contractsRepository,
    id,
    (req as any).profile.id
  );

  if (!contract) return res.status(404).end();
  res.json(contract);
}

export async function handleGetContracts(
  req: Request,
  res: Response
): Promise<void> {
  const contractsRepository = new ContractsRepository(req.app.get("sequelize"));

  try {
    const contracts = await getContractsUseCase(
      contractsRepository,
      (req as any).profile.id
    );
    res.json(contracts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
