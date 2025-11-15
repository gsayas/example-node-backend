import { Request, Response } from "express";
import bestProfessionUseCase from "../usecase/bestProfessionUseCase";
import getBestClientsUseCase from "../usecase/getBestClientsUseCase";
import { ProfessionRepository } from "../repository/ProfessionRepository";
import { BestClientsRepository } from "../repository/BestClientsRepository";

export async function handleGetBestProfession(
  req: Request,
  res: Response
): Promise<void> {
  const { start, end } = req.query;
  const professionRepository = new ProfessionRepository(
    req.app.get("sequelize")
  );

  try {
    const bestProfessions = await bestProfessionUseCase(
      professionRepository,
      new Date(start as string),
      new Date(end as string)
    );
    res.json(bestProfessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetBestClients(
  req: Request,
  res: Response
): Promise<void> {
  const { start, end, limit } = req.query;
  const bestClientsRepository = new BestClientsRepository(
    req.app.get("sequelize")
  );

  try {
    const bestClients = await getBestClientsUseCase(
      bestClientsRepository,
      start as string,
      end as string,
      limit ? parseInt(limit as string) : 2
    );
    res.json(bestClients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
