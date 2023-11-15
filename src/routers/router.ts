import { Router } from "express";

const router = Router();

const userRoute = require('./userRoute')
router.use('/user', userRoute)

const exclusiveContentRoute = require('./exclusiveContentRoute')
router.use('/exclusiveContent', exclusiveContentRoute)

const mediaRoute = require('./exclusiveMediaRoute')
router.use('/media', mediaRoute)

const subscriptionRoute = require('./subscriptionRoute')
router.use('/subscription', subscriptionRoute)

export default router;