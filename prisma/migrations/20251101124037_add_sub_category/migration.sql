/*
  Warnings:

  - You are about to drop the column `parentId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_categoryId_fkey`;

-- DropIndex
DROP INDEX `category_parentId_fkey` ON `category`;

-- DropIndex
DROP INDEX `product_categoryId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `parentId`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`,
    ADD COLUMN `subCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `sub_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sub_category` ADD CONSTRAINT `sub_category_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
