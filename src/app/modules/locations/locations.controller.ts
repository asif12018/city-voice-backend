import { Request, Response, NextFunction } from "express";
import { LocationServices } from "./locations.service";

import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";


const getLocations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await LocationServices.getLocations();
        sendResponse(res, {
            success: true,
            httpStatusCode: status.OK,
            message: "Locations retrieved successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }
};

export const LocationControllers = {
    getLocations
};
