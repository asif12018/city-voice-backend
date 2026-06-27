/*
  Warnings:

  - Added the required column `division` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "division" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "issue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "upvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "downvote" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "downvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "issue_authorId_idx" ON "issue"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "upvote_userId_issueId_key" ON "upvote"("userId", "issueId");

-- CreateIndex
CREATE UNIQUE INDEX "downvote_userId_issueId_key" ON "downvote"("userId", "issueId");

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "downvote" ADD CONSTRAINT "downvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "downvote" ADD CONSTRAINT "downvote_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
