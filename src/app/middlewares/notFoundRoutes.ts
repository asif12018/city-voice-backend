import { Request, Response } from "express";
import status from "http-status";
import { sendResponse } from "../shared/sendResponse";



//not found route


export const notFount = (req:Request, res:Response) =>{
    sendResponse(res,{
        httpStatusCode: status.NOT_FOUND,
        success:false,
        message:`Route ${req.originalUrl} not found`
    })
}