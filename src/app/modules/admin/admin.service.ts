import status from "http-status";
import AppError from "../../../errors/AppError";
import { prisma } from "../../lib/prisma";

const banUser = async (userIdToBan: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userIdToBan }
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    const result = await prisma.user.update({
        where: { id: userIdToBan },
        data: { isBanned: true }
    });

    return result;
};

const deleteIssue = async (issueId: string) => {
    const issueInfo = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issueInfo) {
        throw new AppError(status.NOT_FOUND, "Issue not found");
    }

    const result = await prisma.issue.delete({
        where: { id: issueId }
    });

    return result;
};

const getStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalIssues = await prisma.issue.count();
    const totalDivisions = await prisma.division.count();
    const totalDistricts = await prisma.district.count();

    return {
        totalUsers,
        totalIssues,
        totalDivisions,
        totalDistricts
    };
};

export const AdminServices = {
    banUser,
    deleteIssue,
    getStats
};
