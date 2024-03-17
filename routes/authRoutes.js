import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
 
//router obj
const router = express.Router();

//routes

// register || post
router.post('/register',registerController)


// LOgin ||  POst
router.post('/login',loginController)

export default router