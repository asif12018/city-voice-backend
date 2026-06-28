import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.patch(
    "/users/:id/ban",
    checkAuth(Role.ADMIN),
    AdminControllers.banUser
);

router.delete(
    "/issues/:id",
    checkAuth(Role.ADMIN),
    AdminControllers.deleteIssue
);

router.get(
    "/stats",
    checkAuth(Role.ADMIN),
    AdminControllers.getStats
);

export const AdminRoutes = router;
