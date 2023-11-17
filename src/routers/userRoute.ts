import { login, logout } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;