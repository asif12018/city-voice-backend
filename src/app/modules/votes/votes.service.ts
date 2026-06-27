import status from "http-status";
import AppError from "../../../errors/AppError";
import { prisma } from "../../lib/prisma";

const upvoteIssue = async (userId: string, issueId: string) => {
    return await prisma.$transaction(async (tx) => {
        // Check if issue exists
        const issueExists = await tx.issue.findUnique({
            where: { id: issueId }
        });
        if (!issueExists) {
            throw new AppError(status.NOT_FOUND, "Issue not found");
        }

        // Check for existing downvote
        const existingDownvote = await tx.downVote.findUnique({
            where: { userId_issueId: { userId, issueId } }
        });

        if (existingDownvote) {
            await tx.downVote.delete({
                where: { userId_issueId: { userId, issueId } }
            });
        }

        // Check for existing upvote
        const existingUpvote = await tx.upvote.findUnique({
            where: { userId_issueId: { userId, issueId } }
        });

        if (existingUpvote) {
            // Toggle behavior
            await tx.upvote.delete({
                where: { userId_issueId: { userId, issueId } }
            });
            return { message: "Upvote removed" };
        }

        // Create upvote
        const upvote = await tx.upvote.create({
            data: { userId, issueId }
        });
        return { message: "Upvoted successfully", upvote };
    });
};

const downvoteIssue = async (userId: string, issueId: string) => {
    return await prisma.$transaction(async (tx) => {
        // Check if issue exists
        const issueExists = await tx.issue.findUnique({
            where: { id: issueId }
        });
        if (!issueExists) {
            throw new AppError(status.NOT_FOUND, "Issue not found");
        }

        // Check for existing upvote
        const existingUpvote = await tx.upvote.findUnique({
            where: { userId_issueId: { userId, issueId } }
        });

        if (existingUpvote) {
            await tx.upvote.delete({
                where: { userId_issueId: { userId, issueId } }
            });
        }

        // Check for existing downvote
        const existingDownvote = await tx.downVote.findUnique({
            where: { userId_issueId: { userId, issueId } }
        });

        if (existingDownvote) {
            // Toggle behavior
            await tx.downVote.delete({
                where: { userId_issueId: { userId, issueId } }
            });
            return { message: "Downvote removed" };
        }

        // Create downvote
        const downvote = await tx.downVote.create({
            data: { userId, issueId }
        });
        return { message: "Downvoted successfully", downvote };
    });
};

export const VotesServices = {
    upvoteIssue,
    downvoteIssue
};
