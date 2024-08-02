import express from 'express';
import authRoute from './authRoute.js';
import pageRoute from './pageRoute.js';
import documentsRoute from './documentsRoute.js';
import teamspaceRoute from './teamspaceRoute.js';
import favoritesRoute from './favoritesRoute.js';
import privateRoute from './privateRoute.js';
import usersRoute from './usersRoute.js';
import trashRoute from './trashRoute.js';
import settingsRoute from './settingsRoute.js';
import openAiRoute from './openAiRoute.js';
import blogRoute from './blogRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/page', pageRoute);
router.use('/document', documentsRoute);
router.use('/teamspace', teamspaceRoute);
router.use('/favorite', favoritesRoute);
router.use('/private', privateRoute);
router.use('/user', usersRoute);
router.use('/trash', trashRoute);
router.use('/settings', settingsRoute);
router.use('/ai', openAiRoute);
router.use('/blog',blogRoute)

export default router;
