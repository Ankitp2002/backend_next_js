-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `thesis` DROP FOREIGN KEY `Thesis_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `thesis` DROP FOREIGN KEY `Thesis_reviewerId_fkey`;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
