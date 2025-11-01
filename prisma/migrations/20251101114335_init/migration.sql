/*
  Warnings:

  - Made the column `categoryId` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_categoryId_fkey`;

-- DropIndex
DROP INDEX `product_categoryId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
