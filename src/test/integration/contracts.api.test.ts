import { setupTestDB, teardownTestDB, testDB } from "./testdb";
import { ContractsRepository } from "../../repository/ContractsRepository";
import getContractDetailsUseCase from "../../usecase/getContractDetailsUseCase";
import getContractsUseCase from "../../usecase/getContractsUseCase";

describe("Contract Use Cases", () => {
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

    await testDB.Contract.create({
      status: "new",
      terms: "contract 1 terms",
      ContractorId: contractor1.id,
      ClientId: client1.id,
    });
    await testDB.Contract.create({
      status: "in_progress",
      terms: "contract 2 terms",
      ContractorId: contractor2.id,
      ClientId: client1.id,
    });
  });

  describe("getContractDetailsUseCase", () => {
    it("should return a contract if the user is the contractor", async () => {
      const contract = await getContractDetailsUseCase(
        new ContractsRepository(testDB.sequelize),
        1,
        2
      );

      expect(contract?.id).toEqual(1);
      expect((contract as any)?.ContractorId).toEqual(2);
    });

    it("should return a contract if the user is the client", async () => {
      const contract = await getContractDetailsUseCase(
        new ContractsRepository(testDB.sequelize),
        2,
        1
      );

      expect(contract?.id).toEqual(2);
      expect((contract as any)?.ClientId).toEqual(1);
    });

    it("should return null if the contract does not belong to the user", async () => {
      const contract = await getContractDetailsUseCase(
        new ContractsRepository(testDB.sequelize),
        1,
        3
      );

      expect(contract).toBeNull();
    });
  });

  describe("getContractsUseCase", () => {
    it("should return non-terminated (open) contracts for user", async () => {
      const contracts = await getContractsUseCase(
        new ContractsRepository(testDB.sequelize),
        1
      );

      expect(contracts.length).toEqual(2);
      expect(contracts.some((c: any) => c.status === "terminated")).toBe(false);
    });
  });
});
