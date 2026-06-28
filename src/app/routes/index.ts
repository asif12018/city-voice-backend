import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { IssuesRoutes } from "../modules/issues/issues.routes";
import { VotesRoutes } from "../modules/votes/votes.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { UsersRoutes } from "../modules/users/users.routes";

import { LocationRoutes } from "../modules/locations/locations.routes";

const router:Router = Router()

router.use("/auth", AuthRoutes);
router.use("/issues", IssuesRoutes);
router.use("/votes", VotesRoutes);
router.use("/admin", AdminRoutes);
router.use("/users", UsersRoutes);
router.use("/locations", LocationRoutes);

export const IndexRoutes = router;