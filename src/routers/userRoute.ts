import { addUser, getAllUsers, login, getPremiumUsersNotInList } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post('/getSearch', getPremiumUsersNotInList);
router.post('/login', login);
router.post('/', addUser);
router.get('/', getAllUsers);

module.exports = router;