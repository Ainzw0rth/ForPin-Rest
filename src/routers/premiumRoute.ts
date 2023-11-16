import { premiumList, updatePremium } from "../controllers/premiumController";
import { Router } from "express";

const router = Router();

router.post('/', premiumList);
router.put('/', updatePremium);

module.exports = router;