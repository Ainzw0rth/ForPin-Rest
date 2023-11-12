import { addExclusiveContent } from "../controllers/exclusiveContentController";
import { Router } from "express";

const router = Router();
router.post('/addExclusiveContent', addExclusiveContent);

module.exports = router;

