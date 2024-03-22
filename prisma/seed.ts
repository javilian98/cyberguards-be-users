import { db } from "../src/utils/db.server";

type User = {
  roleId: number;
  firstName: string;
  lastName: string;
  email: string;
};

function getUsers(): User[] {
  return [
    {
      roleId: 2,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    },
    {
      roleId: 1,
      firstName: "Alice",
      lastName: "Doe",
      email: "alicedoe@gmail.com",
    },
    {
      roleId: 1,
      firstName: "Bob",
      lastName: "Doe",
      email: "bobdoe@gmail.com",
    },
  ];
}

async function seed() {
  try {
    await Promise.all(
      getUsers().map((row, index) => {
        const { roleId, firstName, lastName, email } = row;

        return db.user.create({
          data: {
            roleId,
            firstName,
            lastName,
            email,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

seed();
