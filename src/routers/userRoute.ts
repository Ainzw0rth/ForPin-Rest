import { register, login, logout, getPremiumUsersNotInList } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/register', register);
router.post('/getSearch', getPremiumUsersNotInList);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;

