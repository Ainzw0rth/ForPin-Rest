import { addUser, getAllUsers, login } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/login', login);
router.post('/', addUser);
router.get('/', getAllUsers);

module.exports = router;