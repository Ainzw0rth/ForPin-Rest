import { subscription, updateSubscription } from "../controllers/subscriptionController";
import { Router } from "express";

const router = Router();

router.get('/', subscription);
router.put('/', updateSubscription);

module.exports = router;

