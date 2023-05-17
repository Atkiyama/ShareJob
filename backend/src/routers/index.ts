import express from "express";
import { Request, Response, Router } from "express";


import user from "../controller/user";
import getTest from "../controller/getTest";
import registerUser from "../controller/registerUser";

const router: Router = express.Router();
router.post("/user/login", user);
router.get("/test/get/", getTest);
router.post("/user/register", registerUser);
export default router