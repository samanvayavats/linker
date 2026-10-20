import { userLogin, userRegister } from "../controller/user.controller";
import { Router } from "express";
const router = Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
export default router;