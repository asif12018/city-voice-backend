import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { VotesServices } from "./votes.service";

const upvoteIssue = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const issueId = req.params.issueId;
    const result = await VotesServices.upvoteIssue(userId, issueId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: result.message,
        data: result.upvote || null
    });
});

const downvoteIssue = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const issueId = req.params.issueId;
    const result = await VotesServices.downvoteIssue(userId, issueId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: result.message,
        data: result.downvote || null
    });
});

export const VotesControllers = {
    upvoteIssue,
    downvoteIssue
};
