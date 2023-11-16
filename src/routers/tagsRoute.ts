import { getTags } from "../controllers/tagsController";
import { Router } from "express";

const router = Router();

router.get('/', getTags);

module.exports = router;