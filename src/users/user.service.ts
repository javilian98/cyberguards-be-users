import { db } from "../utils/db.server";
import { UserListItem, UserDetail } from "../types/types";

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
      email: true,
    },
    skip,
    take,
  });
};

export const getUser = async (id: string): Promise<UserDetail | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByEmail = async (
  email: string
): Promise<UserDetail | null> => {
  return db.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async (
  item: Omit<UserDetail, "id">
): Promise<UserDetail> => {
  const { firstName, lastName, email, roleId } = item;

  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      roleId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      roleId: true,
    },
  });
};

export const updateUser = async (
  item: Omit<UserDetail, "id">,
  id: string
): Promise<UserDetail> => {
  const { firstName, lastName, email, roleId } = item;

  return db.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      email,
      roleId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      roleId: true,
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
