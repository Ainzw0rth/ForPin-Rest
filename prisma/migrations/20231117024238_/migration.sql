/*
  Warnings:

  - You are about to drop the `Premium_admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `is_admin` to the `Premium_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Premium_user" ADD COLUMN     "is_admin" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Premium_admin";
