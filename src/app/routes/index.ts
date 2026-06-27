import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { IssuesRoutes } from "../modules/issues/issues.routes";


const router:Router = Router()



router.use("/auth", AuthRoutes);

router.use("/issues", IssuesRoutes);





export const IndexRoutes = router;