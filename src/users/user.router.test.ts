import request from "supertest";
import { app } from "../index";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { UserDetail } from "../types/types";

import { db } from "../../src/utils/db.server";
import { seed } from "../../ci/setupTestDatabase";

beforeAll(async () => {
  await seed();
});

afterAll(async () => {
  const deleteUsers = db.user.deleteMany();

  await db.$transaction([deleteUsers]);

  await db.$disconnect();
});

describe("User Routes", () => {
  it.sequential("GET /users should return a list of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it.sequential("GET api/users/:id should get a single user", async () => {
    const id = "1";
    const response = await request(app).get(`/api/users/${id}`);

    const data: UserDetail = response.body;

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(data.id).toBe("1");
  });

  it.sequential("POST api/users should create a new user", async () => {
    const newUser: UserDetail = {
      id: "99",
      firstName: "New",
      lastName: "User 99",
      profession: "Human Resource",
      roleId: 0,
      riskStatus: "low",
      riskScore: 20,
      suspectCaseId: 0,
      lastAccessAt: "",
    };
    const response = await request(app).post(`/api/users`).send(newUser);

    const data: UserDetail = response.body;

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect(data.profession).toBe("Human Resource");
  });

  it.sequential(
    "PUT api/users/:id should update the first name of User with id 1",
    async () => {
      const id = "1";
      const response = await request(app).get(`/api/users/${id}`);

      const data: UserDetail = response.body;

      console.log("PUT: data > ", data);

      const updatedUserDataBody: UserDetail = { ...data, firstName: "Updated" };

      const updatedUserDataResponse = await request(app)
        .put(`/api/users/${id}`)
        .send(updatedUserDataBody);
      // console.log("PUT: updatedUserDataResponse > ", updatedUserDataResponse);
      const updatedUser: UserDetail = updatedUserDataResponse.body;

      expect(updatedUserDataResponse.status).toBe(200);
      expect(typeof updatedUserDataResponse.body).toBe("object");
      expect(updatedUser.profession).toBe("Software Engineer");
      expect(updatedUser.firstName).toBe("Updated");
    }
  );

  it.sequential(
    "DELETE /users/:id should delete an existing user and return status code 204",
    async () => {
      const id = "1"; // from database
      const response = await request(app).delete(`/api/users/${id}`);
      expect(response.status).toBe(204);
    }
  );

  // // Dummy test case to get through CI
  // const sum = (a: number, b: number) => {
  //   return a + b;
  // };
  // it("should add to 2", () => {
  //   expect(sum(1, 2)).toBe(3);
  // });
});
