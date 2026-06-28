import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";


import ms, { type StringValue } from "ms";
import { Response } from "express";
import config from "../config";
import { CookieUtils } from "./cookie";

//generate access token
const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    config.ACCESS_TOKEN_SECRET as string,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );

  return accessToken;
};

//generate refresh token
const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    config.REFRESH_TOKEN_SECRET as string,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );

  return refreshToken;
};

const isProd = config.NODE_ENV === "production";

//set access token cookie
const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};

//set refresh token cookie
const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

// set set better auth session cookie
const setBetterAuthSessionCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};