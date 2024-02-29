-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL DEFAULT 0,
    `profession` VARCHAR(191) NOT NULL,
    `suspectCaseId` INTEGER NOT NULL DEFAULT 0,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `riskStatus` VARCHAR(191) NOT NULL,
    `riskScore` INTEGER NOT NULL DEFAULT 0,
    `lastAccessAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
