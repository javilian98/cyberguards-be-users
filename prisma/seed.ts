import { db } from "../src/utils/db.server";

type User = {
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
      roleId: 0,
      profession: "Software Engineer",
      suspectTypeId: 0,
      firstName: "John",
      lastName: "Doe",
      riskStatus: "low",
      riskScore: 0,
    },
    {
      roleId: 1,
      profession: "Data Analyst",
      suspectTypeId: 0,
      firstName: "Alice",
      lastName: "Doe",
      riskStatus: "medium",
      riskScore: 40,
    },
    {
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

async function seed() {
  try {
    await Promise.all(
      getUsers().map((row, index) => {
        const {
          roleId,
          firstName,
          lastName,
          profession,
          riskStatus,
          riskScore,
        } = row;

        return db.user.create({
          data: {
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

seed();
