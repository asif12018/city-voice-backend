import { Router } from "express";
import { UserControllers } from "./users.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.get(
    "/me",
    checkAuth(Role.USER, Role.ADMIN),
    UserControllers.getMyDashboard
);

export const UsersRoutes = router;
