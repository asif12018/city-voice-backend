/*
  Warnings:

  - You are about to drop the column `district` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `user` table. All the data in the column will be lost.
  - Added the required column `districtId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divisionId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "district",
DROP COLUMN "division",
ADD COLUMN     "districtId" TEXT NOT NULL,
ADD COLUMN     "divisionId" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "division"("id") ON DELETE CASCADE ON UPDATE CASCADE;
