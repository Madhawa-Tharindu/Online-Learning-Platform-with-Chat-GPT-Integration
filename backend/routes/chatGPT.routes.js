import express from "express";
import { courseSuggestions } from '../controllers/gpt.controller.js';
const router = express.Router();


router.post('/suggest-courses', courseSuggestions );

export default router;