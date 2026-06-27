import { StringValue } from "ms";
import config from "../../config";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import ms from "ms";
import { prisma } from "../../lib/prisma";
import AppError from "../../../errors/AppError";
import status from "http-status";
import { auth } from "../../lib/auth";
import { tokenUtils } from "../../utils/token";






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



export const AuthServices = {
    registerUser,
    loginUser
}