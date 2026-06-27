import { Router } from "express";
import { IssuesControllers } from "./issues.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
    "/create", 
    checkAuth(Role.ADMIN, Role.USER), 
    IssuesControllers.createIssue
);

router.get(
    "/division", 
    checkAuth(Role.ADMIN, Role.USER), 
    IssuesControllers.getIssuebyDivision
);

router.get(
    "/global", 
    IssuesControllers.getGlobalIssues
);

router.delete(
    "/:id", 
    checkAuth(Role.ADMIN, Role.USER), 
    IssuesControllers.deleteIssues
);

export const IssuesRoutes = router;