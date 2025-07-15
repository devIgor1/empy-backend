/*
  Warnings:

  - You are about to drop the column `ativo` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `desconto` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `nameInternal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `namePublic` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `precoAnual` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `precoMensal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `qtdCreditosOff` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `qtdCreditosOn` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `recomendado` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `annualPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offlineCredits` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onlineCredits` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicName` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "ativo",
DROP COLUMN "desconto",
DROP COLUMN "nameInternal",
DROP COLUMN "namePublic",
DROP COLUMN "precoAnual",
DROP COLUMN "precoMensal",
DROP COLUMN "qtdCreditosOff",
DROP COLUMN "qtdCreditosOn",
DROP COLUMN "recomendado",
ADD COLUMN     "annualPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "internalName" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRecommended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "monthlyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "offlineCredits" INTEGER NOT NULL,
ADD COLUMN     "onlineCredits" TEXT NOT NULL,
ADD COLUMN     "publicName" TEXT NOT NULL;
