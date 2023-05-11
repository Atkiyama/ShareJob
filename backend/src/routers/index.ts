import express from "express";
import { Request, Response, Router } from "express";


import user from "../controller/user";
import getTest from "../controller/getTest";
import createUser from "../controller/createUser";

const router: Router = express.Router();
router.post("/user/login", user);
router.get("/test/get/", getTest);
router.post("/user/create", createUser);
export default router