import { db } from "../src/utils/db.server";

type User = {
  id: string;
  roleId: number;
  profession: string;
  suspectTypeId: number;
  firstName: string;
  lastName: string;
  riskStatus: string;
  riskScore: number;
};

function getUsers(): User[] {
  return [
    {
      id: "1",
      roleId: 0,
      profession: "Software Engineer",
      suspectTypeId: 0,
      firstName: "John",
      lastName: "Doe",
      riskStatus: "low",
      riskScore: 0,
    },
    {
      id: "2",
      roleId: 1,
      profession: "Data Analyst",
      suspectTypeId: 0,
      firstName: "Alice",
      lastName: "Doe",
      riskStatus: "medium",
      riskScore: 40,
    },
    {
      id: "3",
      roleId: 1,
      profession: "UI/UX Designer",
      suspectTypeId: 0,
      firstName: "Bob",
      lastName: "Doe",
      riskStatus: "high",
      riskScore: 80,
    },
  ];
}

export async function seed() {
  try {
    await Promise.all(
      getUsers().map((row, index) => {
        const {
          id,
          roleId,
          firstName,
          lastName,
          profession,
          riskStatus,
          riskScore,
        } = row;

        return db.user.create({
          data: {
            id,
            roleId,
            profession,
            firstName,
            lastName,
            riskStatus,
            riskScore,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

// seed();
