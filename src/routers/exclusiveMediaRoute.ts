import { saveExclusiveMedia } from "../controllers/exclusiveMediaController";
import { Router } from "express";

const router = Router();

router.post('/', saveExclusiveMedia);

module.exports = router;
