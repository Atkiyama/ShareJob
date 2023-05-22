import express from "express";
import { Request, Response, Router } from "express";


import loginUser from "../controller/user/LoginUser";
import registerUser from "../controller/user/registerUser";
import getCompanyInfoList from "../controller/companyInfo/getCompanyInfoList";
import registerCompanyInfo from "../controller/companyInfo/registerCompanyInfo"

const router: Router = express.Router();
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);
router.get("/companyInfo/getCompanyInfoList", getCompanyInfoList);
router.post("/companyInfo/registerCompanyInfo", registerCompanyInfo);
export default router