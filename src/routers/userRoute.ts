import { addUser, login } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/login', login);
router.get('/:user_id', addUser);

module.exports = router;