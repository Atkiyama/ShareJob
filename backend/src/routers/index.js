"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const getTest_1 = __importDefault(require("../controller/getTest"));
const createUser_1 = __importDefault(require("../controller/createUser"));
const router = express_1.default.Router();
router.post("/user/login", user_1.default);
router.get("/test/get/", getTest_1.default);
router.post("/user/create", createUser_1.default);
exports.default = router;
