import { ProfessionRepository } from "../repository/ProfessionRepository";
import createProfessionEarnings from "../domain/professionEarnings";

async function bestProfessionUseCase(
  repository: ProfessionRepository,
  start: Date,
  end: Date
) {
  const bestProfessionsData = await repository.getBestProfessions(start, end);

  return createProfessionEarnings(
    bestProfessionsData.profession,
    bestProfessionsData.earnings
  );
}

export default bestProfessionUseCase;
