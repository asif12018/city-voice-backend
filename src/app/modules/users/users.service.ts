import status from "http-status";
import AppError from "../../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getMyDashboard = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            district: true,
            division: true,
            _count: {
                select: {
                    issues: true,
                    upvotes: true,
                    downvotes: true
                }
            }
        }
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    return user;
};

export const UserServices = {
    getMyDashboard
};
