import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { IssuesRoutes } from "../modules/issues/issues.routes";
import { VotesRoutes } from "../modules/votes/votes.routes";


const router:Router = Router()



router.use("/auth", AuthRoutes);

router.use("/issues", IssuesRoutes);

router.use("/votes", VotesRoutes);





export const IndexRoutes = router;