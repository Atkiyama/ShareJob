import express from "express";
import { Request, Response, Router } from "express";


import loginUser from "../controller/user/LoginUser";
import registerUser from "../controller/user/registerUser";
import getCompanyInfoList from "../controller/companyInfo/getCompanyInfoList";
import registerCompanyInfo from "../controller/companyInfo/registerCompanyInfo"
import getCompanyList from "../controller/company/getCompanyList";

const router: Router = express.Router();
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);
router.get("/companyInfo/getCompanyInfoList", getCompanyInfoList);
router.post("/companyInfo/registerCompanyInfo", registerCompanyInfo);
router.get("/company/getCompanyList", getCompanyList);
export default router