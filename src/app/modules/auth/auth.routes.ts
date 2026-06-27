import {Router} from "express"
import { AuthControllers } from "./auth.controller";





const router = Router();

// register a user

router.post("/register", AuthControllers.registerUser);
router.post("/login", AuthControllers.loginUser);




export const AuthRoutes = router;