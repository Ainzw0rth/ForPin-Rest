import { subscription } from "../controllers/subscriptionController";
import { Router } from "express";

const router = Router();

router.get('/', subscription);
router.get('/', subscription);

module.exports = router;

