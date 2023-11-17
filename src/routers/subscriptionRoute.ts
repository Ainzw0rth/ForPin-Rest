import { subscription, notYetSubscribed, updateSubscription } from "../controllers/subscriptionController";
import { Router } from "express";

const router = Router();

router.get('/', subscription);
router.post('/', notYetSubscribed);
router.put('/', updateSubscription);

module.exports = router;

