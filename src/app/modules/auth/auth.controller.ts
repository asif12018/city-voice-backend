import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import AppError from "../../../errors/AppError";








//register a user
const registerUser = catchAsync(async(req:Request, res:Response)=>{
    let payload = req?.body;
    const result = await AuthServices.registerUser(payload);

    //set access token
    tokenUtils.setAccessTokenCookie(res, result.accessToken);
    tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, result.token as string);

    sendResponse(res,{
        httpStatusCode: status.CREATED,
        success: true,
        message:"User register successfully",
        data: result
    })
});


//login a user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  //set access token in cookies
  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, result.token as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});



//refresh token

const getNewRefreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];

  if (!refreshToken) {
    throw new AppError(status.UNAUTHORIZED, "Refresh token not found");
  }
  const result = await AuthServices.getNewToken(
    refreshToken,
    betterAuthSessionToken,
  );
  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
  //set access token in cookies
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "New refresh token generated successfully",
    data: result,
  });
});


export const AuthControllers = {
  registerUser,
  loginUser
}
