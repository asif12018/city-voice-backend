import { Router } from "express";
import { VotesControllers } from "./votes.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// Routes for upvoting and downvoting issues
router.post("/:issueId/upvote", checkAuth(), VotesControllers.upvoteIssue);
router.post("/:issueId/downvote", checkAuth(), VotesControllers.downvoteIssue);

export const VotesRoutes = router;
