import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { AdminServices } from "./admin.service";


const banUser = catchAsync(async (req: Request, res: Response) => {
    const userIdToBan = req.params.id;
    const result = await AdminServices.banUser(userIdToBan as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User banned successfully",
        data: result
    });
});

const deleteIssue = catchAsync(async (req: Request, res: Response) => {
    const issueId = req.params.id;
    const result = await AdminServices.deleteIssue(issueId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Issue deleted successfully by admin",
        data: result
    });
});

const getStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getStats();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin stats retrieved successfully",
        data: result
    });
});

export const AdminControllers = {
    banUser,
    deleteIssue,
    getStats
};
