import express from "express";
import type { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";

import * as UserService from "./user.service";

export const userRouter = express.Router();

userRouter.get(
  "/",
  query("skip")
    .optional()
    .isNumeric()
    .toInt()
    .withMessage("Skip must be a number"),
  query("take")
    .optional()
    .isNumeric()
    .toInt()
    .withMessage("Take must be a number")
    .isInt({ max: 50 })
    .withMessage("Take must be less than or equal to 50."),
  query("roleId")
    .optional()
    .isNumeric()
    .toInt()
    .withMessage("role id must be a number"),
  query("userIds").optional().isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const queries = {
        skip: request.query.skip ? Number(request.query.skip) : undefined,
        take: request.query.take ? Number(request.query.take) : undefined,
        roleId: request.query.roleId ? Number(request.query.roleId) : undefined,
        userIds: request.query.userIds
          ? request.query.userIds.toString()
          : undefined,
      };

      const users = await UserService.getUserList(queries);
      return response.status(200).json(users);
    } catch (error: any) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }
);

userRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const singleCase = await UserService.getUser(request.params.id);
    if (!singleCase) {
      return response.status(404).json("User cannot be not found.");
    }
    return response.status(200).json(singleCase);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a User
// PARAMS: firstName, lastName, employeeType, roleId, riskStatus, riskScore, suspectType
userRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  body("profession").isString(),
  body("roleId").isNumeric(),
  body("riskStatus").isString(),
  body("riskScore").isNumeric(),
  body("suspectCaseId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const userItem = request.body;
      const newCase = await UserService.createUser(userItem);
      return response.status(201).json(newCase);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update a User
// PARAMS: firstName, lastName, employeeType, roleId, riskStatus, riskScore, suspectType
userRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  body("profession").isString(),
  body("roleId").isNumeric(),
  body("riskStatus").isString(),
  body("riskScore").isNumeric(),
  body("suspectCaseId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const userItem = request.body;
      const updatedUser = await UserService.updateUser(
        userItem,
        request.params.id
      );

      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete a User based on its uuid
userRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    await UserService.deleteUser(request.params.id);
    return response.status(204).json("User has been successfully deleted.");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
