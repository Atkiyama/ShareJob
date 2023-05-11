import express from "express";
import { Request, Response, Router } from "express";


import user from "../controller/user";
const router: Router = express.Router();
router.post("/user/login", user);
export default router