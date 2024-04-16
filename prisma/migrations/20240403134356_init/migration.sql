/*
  Warnings:

  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'https://img.freepik.com/premium-vector/customer-service-agent-icon-vector-image-can-be-used-digital-nomad_120816-85794.jpg?w=826';
