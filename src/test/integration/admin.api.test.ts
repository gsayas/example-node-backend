import { setupTestDB, teardownTestDB, testDB } from "./testdb";
import bestProfessionUseCase from "../../usecase/bestProfessionUseCase";
import { ProfessionRepository } from "../../repository/ProfessionRepository";

describe("bestProfessionUseCase", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await testDB.sequelize.sync({ force: true });

    const client1 = await testDB.Profile.create({
      firstName: "John",
      lastName: "Doe",
      profession: "Developer",
      balance: 1000,
      type: "client",
    });
    const client2 = await testDB.Profile.create({
      firstName: "Jane",
      lastName: "Doe",
      profession: "Designer",
      balance: 1000,
      type: "client",
    });
    const contractor1 = await testDB.Profile.create({
      firstName: "Alice",
      lastName: "Smith",
      profession: "Architect",
      balance: 0,
      type: "contractor",
    });
    const contractor2 = await testDB.Profile.create({
      firstName: "Bob",
      lastName: "Johnson",
      profession: "Developer",
      balance: 0,
      type: "contractor",
    });

    const contract1 = await testDB.Contract.create({
      status: "terminated",
      terms: "contract 1 terms",
      ContractorId: contractor1.id,
      ClientId: client1.id,
    });
    const contract2 = await testDB.Contract.create({
      status: "terminated",
      terms: "contract 2 terms",
      ContractorId: contractor2.id,
      ClientId: client2.id,
    });

    const now = new Date();

    await testDB.Job.create({
      description: "job 1",
      price: 500,
      paid: true,
      paymentDate: now,
      ContractId: contract1.id,
    });
    await testDB.Job.create({
      description: "job 2",
      price: 300,
      paid: true,
      paymentDate: now,
      ContractId: contract1.id,
    });
    await testDB.Job.create({
      description: "job 3",
      price: 400,
      paid: true,
      paymentDate: now,
      ContractId: contract2.id,
    });
  });

  it("should return the profession that earned the most money in the given period", async () => {
    const start = new Date();
    start.setDate(start.getDate() - 1); // yesterday
    const end = new Date();
    end.setDate(end.getDate() + 1); // tomorrow

    const professions = await bestProfessionUseCase(
      new ProfessionRepository(testDB.sequelize),
      start,
      end
    );

    expect(professions.profession).toEqual("Architect");
    expect(professions.earnings).toEqual(800);
  });

  it("should return an empty object if there are no paid jobs in the given period", async () => {
    const start = new Date();
    start.setDate(start.getDate() + 1); // tomorrow
    const end = new Date();
    end.setDate(end.getDate() + 2); // day after tomorrow

    const profession = await bestProfessionUseCase(
      new ProfessionRepository(testDB.sequelize),
      start,
      end
    );

    expect(profession).toEqual({ profession: undefined, earnings: undefined }); //TODO: should be empty object
  });
});
