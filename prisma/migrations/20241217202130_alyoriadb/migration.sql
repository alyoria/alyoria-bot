-- CreateTable
CREATE TABLE `guilds_settings` (
    `guildId` VARCHAR(191) NOT NULL,
    `lang` VARCHAR(191) NOT NULL DEFAULT 'en',
    `prefix` VARCHAR(191) NOT NULL DEFAULT 'a!',
    `beta` BOOLEAN NOT NULL DEFAULT false,
    `logsEnabled` BOOLEAN NOT NULL DEFAULT false,
    `ticketsEnabled` BOOLEAN NOT NULL DEFAULT false,
    `anonymEnabled` BOOLEAN NOT NULL DEFAULT false,
    `logsChannel` VARCHAR(191) NULL,
    `ticketsLogsChannel` VARCHAR(191) NULL,
    `anonymLogsChannel` VARCHAR(191) NULL,
    `arrivalsChannel` VARCHAR(191) NULL,
    `departuresChannel` VARCHAR(191) NULL,
    `rulesChannel` VARCHAR(191) NULL,
    `announcementsChannel` VARCHAR(191) NULL,
    `discussionsChannel` VARCHAR(191) NULL,
    `anonymChannel` VARCHAR(191) NULL,
    `autoVocalChannel` VARCHAR(191) NULL,
    `openTicketCategory` VARCHAR(191) NULL,
    `closeTicketCategory` VARCHAR(191) NULL,

    UNIQUE INDEX `guilds_settings_guildId_key`(`guildId`),
    PRIMARY KEY (`guildId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_data` (
    `userId` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 0,
    `messageCount` INTEGER NOT NULL DEFAULT 0,
    `vocalTime` INTEGER NOT NULL DEFAULT 0,
    `lastMessageAt` DATETIME(3) NULL,
    `lastVocalAt` DATETIME(3) NULL,

    UNIQUE INDEX `user_data_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
