import { Router } from "express";
import { IssuesControllers } from "./issues.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post(
    "/create", 
    checkAuth(), 
    IssuesControllers.createIssue
);

router.get(
    "/division", 
    checkAuth(), 
    IssuesControllers.getIssuebyDivision
);

router.get(
    "/global", 
    IssuesControllers.getGlobalIssues
);

router.delete(
    "/:id", 
    checkAuth(), 
    IssuesControllers.deleteIssues
);

export const IssuesRoutes = router;