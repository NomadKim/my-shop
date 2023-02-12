/*
  Warnings:

  - Added the required column `dostavleno` to the `OrdersWithProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magazin` to the `OrdersWithProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpravleno` to the `OrdersWithProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zakazano` to the `OrdersWithProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdersWithProducts" ADD COLUMN     "dostavleno" BOOLEAN NOT NULL,
ADD COLUMN     "magazin" TEXT NOT NULL,
ADD COLUMN     "otpravleno" BOOLEAN NOT NULL,
ADD COLUMN     "zakazano" BOOLEAN NOT NULL;
