/*
  Warnings:

  - You are about to drop the `_OrdersToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sum` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrdersToProduct" DROP CONSTRAINT "_OrdersToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdersToProduct" DROP CONSTRAINT "_OrdersToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "sum" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrdersToProduct";

-- CreateTable
CREATE TABLE "OrdersWithProducts" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantityOfProduct" INTEGER NOT NULL,

    CONSTRAINT "OrdersWithProducts_pkey" PRIMARY KEY ("productId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrdersWithProducts" ADD CONSTRAINT "OrdersWithProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersWithProducts" ADD CONSTRAINT "OrdersWithProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
