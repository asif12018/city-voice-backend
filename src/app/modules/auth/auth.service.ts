import { StringValue } from "ms";
import config from "../../config";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import ms from "ms";
import { prisma } from "../../lib/prisma";
import AppError from "../../../errors/AppError";
import status from "http-status";
import { getAuth } from "../../lib/auth";
import { tokenUtils } from "../../utils/token";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";






//register a user





const registerUser = async (payload: IRegisterUser) => {
    const maxAgeOfAccessToken = ms(config.ACCESS_TOKEN_EXPIRES_IN as StringValue);
    const maxAgeOfRefreshToken = ms(config.REFRESH_TOKEN_EXPIRES_IN as StringValue);

    //checking if the user already exist
    const isUserExist = await prisma.user.findFirst({
        where: {
            email: payload.email
        }
    });

    //checking the user exist or not

    if (isUserExist) {
        throw new AppError(status.BAD_REQUEST, "User with the email already exist")
    }

    //creating the user

    const auth = await getAuth();
    const data = await auth.api.signUpEmail({
        body: payload
    })

    if (!data.user) {
        throw new AppError(status.BAD_REQUEST, "Failed to register a user")
    }

    //generate access token

    const accessToken = tokenUtils.getAccessToken({
        id: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email
    })

    //generate refresh token
    const refreshToken = tokenUtils.getRefreshToken({
        id: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email
    })

    const getToken = await prisma.session.findFirst({
        where:{
            userId: data.user.id
        }
    })

    return {
        token: getToken?.token,
        accessToken,
        refreshToken,
        user:data.user
    }
}



//login user

const loginUser = async ( payload: ILoginUser) =>{
    const maxAgeOfAccessToken = ms(config.ACCESS_TOKEN_EXPIRES_IN as StringValue);
    const maxAgeOfRefreshToken = ms(config.REFRESH_TOKEN_EXPIRES_IN as StringValue);

    const auth = await getAuth();
    const data = await auth.api.signInEmail({
        body:payload
    });

    if(!data){
        throw new AppError(status.BAD_REQUEST, "invalid email or password")
    }

    if(data.user.isBanned === true){
        throw new AppError(status.UNAUTHORIZED, "unfortunatly you are banned for vilolating our terms and conditions")
    }

    //generate access token

    const accessToken = tokenUtils.getAccessToken({
        id: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email
    })

    //generate refresh token
    const refreshToken = tokenUtils.getRefreshToken({
        id: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email
    })

    const getToken = await prisma.session.findFirst({
        where:{
            userId: data.user.id
        }
    })

    return {
        token: getToken?.token,
        accessToken,
        refreshToken,
        user:data.user
    }

}

//get new  refresh token

const getNewToken = async (refreshToken: string, sessionToken: string) => {
  const isSessionTokenExist = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExist) {
    throw new AppError(status.BAD_REQUEST, "invalid session token");
  }

  if (isSessionTokenExist.user.isBanned === true) {
    throw new AppError(
      status.UNAUTHORIZED,
      "You are banned from accessing this service",
    );
  }

  //verify the refresh token
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    config.REFRESH_TOKEN_SECRET as string,
  );

  if (!verifiedRefreshToken.success && verifiedRefreshToken.err) {
    throw new AppError(status.UNAUTHORIZED, "invalid refresh token");
  }

  const data = verifiedRefreshToken.data as JwtPayload;
  const newAccessToken = tokenUtils.getAccessToken({
    userId: data.userId,
    email: data.email,
    role: data.role,
  });

  const newRefreshToken = tokenUtils.getRefreshToken({
    userId: data.userId,
    email: data.email,
    role: data.role,
  });

  //update the session token
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000),
      updatedAt: new Date(),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token,
  };
};




export const AuthServices = {
    registerUser,
    loginUser,
    getNewToken
}