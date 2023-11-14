import { addExclusiveContent, getExclusiveContent, getExclusiveContents } from "../controllers/exclusiveContentController";
import { Router } from "express";

const router = Router();

router.post('/', addExclusiveContent);
router.get('/', getExclusiveContents);
router.get('/:post_id', getExclusiveContent);

module.exports = router;

