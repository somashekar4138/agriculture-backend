/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "RedSoil" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isExist" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "groundnut" INTEGER NOT NULL,
    "kagi" INTEGER NOT NULL,
    "pulse" INTEGER NOT NULL,
    "vegetable" INTEGER NOT NULL,
    "cereal" INTEGER NOT NULL,

    CONSTRAINT "RedSoil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackSoil" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isExist" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cotton" INTEGER NOT NULL,
    "wheat" INTEGER NOT NULL,
    "maize" INTEGER NOT NULL,
    "sunflower" INTEGER NOT NULL,
    "sugarcane" INTEGER NOT NULL,
    "rice" INTEGER NOT NULL,

    CONSTRAINT "BlackSoil_pkey" PRIMARY KEY ("id")
);
