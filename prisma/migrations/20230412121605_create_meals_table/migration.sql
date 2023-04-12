/*
  Warnings:

  - Made the column `sequencilyDaysSuccess` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastSequencilyDaysSuccess` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "sequencilyDaysSuccess" SET NOT NULL,
ALTER COLUMN "lastSequencilyDaysSuccess" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDiet" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meals_user_id_key" ON "meals"("user_id");
