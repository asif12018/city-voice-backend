/*
  Warnings:

  - Added the required column `districtId` to the `issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divisionId` to the `issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "districtId" TEXT NOT NULL,
ADD COLUMN     "divisionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;
