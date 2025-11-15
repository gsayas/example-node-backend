import { Request, Response } from "express";
import payForJobUseCase from "../usecase/payForJobUseCase";
import getUnpaidJobsUseCase from "../usecase/getUnpaidJobsUseCase";
import { JobRepository } from "../repository/JobRepository";

export async function handlePostJob(
  req: Request,
  res: Response
): Promise<void> {
  const { job_id } = req.params;
  const jobRepository = new JobRepository(req.app.get("sequelize"));

  try {
    const job = await payForJobUseCase(
      jobRepository,
      job_id,
      (req as any).profile.id
    );
    res.json(job);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetUnpaidJobs(
  req: Request,
  res: Response
): Promise<void> {
  const userId = (req as any).profile.id;
  const jobRepository = new JobRepository(req.app.get("sequelize"));

  try {
    const jobs = await getUnpaidJobsUseCase(jobRepository, userId);
    res.json(jobs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
