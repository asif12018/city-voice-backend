import { betterAuth } from "better-auth";
import { Pool } from "pg";
import config from "../config";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";






// better auth configuration
export const auth = betterAuth({
  baseURL: config.BETTER_AUTH_URL,
  basePath:"/api/v1/auth",
  secret: config.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma,{
    provider:"postgresql"
  }),
  emailAndPassword:{
    enabled: true,
    requireEmailVerification: false
  },
  //addictional information
  user:{
    additionalFields:{
      role:{
        type: "string",
        required: false,
        defaultValue: "USER"
      },
      gender:{
        type: "string",
        required: true,
      },
      district:{
        type: "string",
        required: true
      },
      division:{
        type: "string",
        required: true
      },
      isBanned:{
        type: "boolean",
        required: false,
        defaultValue: false
      }
    }
  },
  session:{
    expiresIn: 60 * 60 * 60 * 24, 
    updateAge: 60 * 60 * 60 * 24 * 30, 
    cookieCache : {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24 ,
    }
  },
  trustedOrigins: [
    config.BETTER_AUTH_URL || "http://localhost:5000",
    config.FRONTEND_URL || "http://localhost:3000"
  ],
  cookies:{
    state: {
      attributes: {
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        path: "/"
      }
    },
    sessionToken:{
      attributes:{
       sameSite: "none",
       secure: true,
       httpOnly: true,
       path:"/" 
      }
    }
  }
});