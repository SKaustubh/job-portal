import express from "express";
import {testPostController} from "../controllers/testController.js";


// router obj
const router = express.Router();

// routes
router.post('/test-post',testPostController )

// export
export default router