import { addExclusiveContent, getExclusiveContent, getExclusiveContents } from "../controllers/exclusiveContentController";
import { Router } from "express";

const router = Router();

router.post('/', addExclusiveContent);
router.get('/', getExclusiveContents);
router.get('/:contentdetails/', getExclusiveContent);

module.exports = router;

