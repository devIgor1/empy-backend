/*
  Warnings:

  - You are about to drop the column `annualPrice` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyPrice` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `namePublic` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoAnual` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoMensal` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdCreditosOff` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdCreditosOn` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "annualPrice",
DROP COLUMN "discount",
DROP COLUMN "monthlyPrice",
DROP COLUMN "name",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "desconto" DOUBLE PRECISION,
ADD COLUMN     "nameInternal" TEXT,
ADD COLUMN     "namePublic" TEXT NOT NULL,
ADD COLUMN     "precoAnual" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precoMensal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "qtdCreditosOff" INTEGER NOT NULL,
ADD COLUMN     "qtdCreditosOn" TEXT NOT NULL,
ADD COLUMN     "recomendado" BOOLEAN NOT NULL DEFAULT false;
