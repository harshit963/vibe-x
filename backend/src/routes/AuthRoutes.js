import { signup, login } from "../controllers/AuthControllers.js"
import  { signupValidation, loginValidation } from "../middleware/AuthMiddlewares.js"
import { Router } from "express";
const router = Router();




router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

export default router;