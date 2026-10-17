import { userRegister } from "../controller/user.controller";
import { Router } from "express";
const router = Router();

router.route('/register').post(userRegister);

export default router;