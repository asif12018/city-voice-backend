import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { IssuesServices } from "./issues.service";

const createIssue = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await IssuesServices.createIssue(req.body, userId);

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Issue created successfully",
        data: result
    });
});

const getIssuebyDivision = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await IssuesServices.getIssuebyDivision(userId);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Issues retrieved successfully",
        data: result
    });
});

const getGlobalIssues = catchAsync(async (req: Request, res: Response) => {
    const result = await IssuesServices.getGlobalIssues();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Global issues retrieved successfully",
        data: result
    });
});

const deleteIssues = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const issueId = req.params.id;
    const result = await IssuesServices.deleteIssues(userId, issueId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Issue deleted successfully",
        data: result
    });
});

export const IssuesControllers = {
    createIssue,
    getIssuebyDivision,
    getGlobalIssues,
    deleteIssues
};
