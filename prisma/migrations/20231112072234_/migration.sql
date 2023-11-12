/*
  Warnings:

  - The primary key for the `premium_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `premium_post_id` on the `premium_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,email]` on the table `premium_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "premium_user" DROP CONSTRAINT "premium_user_pkey",
DROP COLUMN "premium_post_id",
ALTER COLUMN "user_id" DROP DEFAULT;
DROP SEQUENCE "premium_user_user_id_seq";

-- CreateTable
CREATE TABLE "premium_user_content" (
    "user_id" INTEGER NOT NULL,
    "premium_post_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "premium_user_content_user_id_premium_post_id_key" ON "premium_user_content"("user_id", "premium_post_id");

-- CreateIndex
CREATE UNIQUE INDEX "premium_user_user_id_email_key" ON "premium_user"("user_id", "email");
