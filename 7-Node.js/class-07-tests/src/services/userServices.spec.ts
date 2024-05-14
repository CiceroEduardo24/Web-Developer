import { describe, expect, it, test } from "vitest";
import { userServices } from "./userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";

describe("test user create function", () => {
  it("should create a user", async () => {
    const user = {
      id: "1",
      name: "Eduardo",
      email: "9090@orestotuinventa.com",
    };

    const userCreated = await userServices.create(user, userRepositoryInMemory);

    expect(userCreated).toHaveProperty("id");
    expect(userCreated).toHaveProperty("name");
  });
});
