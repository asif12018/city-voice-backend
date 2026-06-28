import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { UserServices } from "./users.service";


const getMyDashboard = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await UserServices.getMyDashboard(userId);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User dashboard data retrieved successfully",
        data: result
    });
});

export const UserControllers = {
    getMyDashboard
};
