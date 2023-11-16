import { subscription, updateSubscription } from "../controllers/subscriptionController";
import { Router } from "express";

const router = Router();

router.post('/', subscription);
router.put('/', updateSubscription);

module.exports = router;

