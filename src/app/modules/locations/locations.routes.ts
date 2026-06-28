import { Router } from "express";
import { LocationControllers } from "./locations.controller";

const router = Router();

router.get("/", LocationControllers.getLocations);

export const LocationRoutes = router;
