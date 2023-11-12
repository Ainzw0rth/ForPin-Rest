import { register, login, logout } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;

