import express from "express";

import profileController from "../controllers/profileController.js";
import authMiddleware from "../utils/middleware.js";

const router = express.Router();

router.use(authMiddleware); // Protect all routes below with authentication

router.get("/", profileController.getProfile);
router.put("/", profileController.updateProfile);

module.exports = router;
