/*
  Warnings:

  - Added the required column `categoryId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_subCategoryId_fkey`;

-- DropIndex
DROP INDEX `product_subCategoryId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `categoryId` INTEGER NOT NULL,
    MODIFY `subCategoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
