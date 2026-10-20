import { authenticateToken } from "../middleware/auth.middleware";
import { createTheZap } from "../controller/zap.controller";
import { Router } from "express";
const route = Router();

route.post("/:userId" ,authenticateToken , createTheZap);

export default route;