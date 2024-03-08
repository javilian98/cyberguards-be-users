import { db } from "../utils/db.server";

type UserListItem = {
  firstName: string;
  lastName: string;
  profession: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: Date | null;
};
type User = {
  firstName: string;
  lastName: string;
  profession: string;
  roleId: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt?: Date | null;
};

export const getUserList = async ({
  skip = 0,
  take = 10,
  roleId = undefined,
  userIds = "",
}: {
  skip?: number; // Making skip optional
  take?: number; // Making take optional
  roleId?: number; // Making roleId optional
  userIds?: string | undefined;
} = {}): Promise<UserListItem[]> => {
  const userIdsArray = userIds == "" ? undefined : userIds.split(",");

  return db.user.findMany({
    where: {
      roleId,
      id: {
        in: userIdsArray,
      },
    },
    select: {
      id: true,
      roleId: true,
      firstName: true,
      lastName: true,
      profession: true,
      riskScore: true,
      lastAccessAt: true,
      suspectCaseId: true,
    },
    skip,
    take,
  });
};

export const getUser = async (id: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (item: Omit<User, "id">): Promise<User> => {
  const {
    firstName,
    lastName,
    profession,
    roleId,
    riskStatus,
    riskScore,
    suspectCaseId,
  } = item;

  return db.user.create({
    data: {
      firstName,
      lastName,
      profession,
      roleId,
      riskStatus,
      riskScore,
      suspectCaseId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profession: true,
      roleId: true,
      riskStatus: true,
      riskScore: true,
      suspectCaseId: true,
    },
  });
};

export const updateUser = async (
  item: Omit<User, "id">,
  id: string
): Promise<User> => {
  const {
    firstName,
    lastName,
    profession,
    roleId,
    riskStatus,
    riskScore,
    suspectCaseId,
  } = item;

  return db.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      profession,
      roleId,
      riskStatus,
      riskScore,
      suspectCaseId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profession: true,
      roleId: true,
      riskStatus: true,
      riskScore: true,
      suspectCaseId: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: {
      id,
    },
  });
};
