import express from "express";
import { Request, Response, Router } from "express";


import loginUser from "../controller/user/LoginUser";
import registerUser from "../controller/user/registerUser";
import getCompanyInfoList from "../controller/companyInfo/getCompanyInfoList";

const router: Router = express.Router();
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);
router.get("/companyInfo/getCompanyInfoList", getCompanyInfoList);
export default router