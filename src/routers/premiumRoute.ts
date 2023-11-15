import { premiumList, updatePremium } from "../controllers/premiumController";
import { Router } from "express";

const router = Router();

router.get('/', premiumList);
router.put('/', updatePremium);

module.exports = router;

