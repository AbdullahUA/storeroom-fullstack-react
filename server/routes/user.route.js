import {Router}  from 'express';
import { forgotPasswordController, loginController, logoutController, refreshTokenController, registerUserController, updateUserDetails, uploadUserImage, verifyEmailController, verifyOtp,resetPassword, userDetails } from "../controllers/user.controller.js";
import auth from '../middleware/auth.js';
const userRouter = Router();
import  upload  from '../middleware/multer.js';




userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadUserImage)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-otp',verifyOtp)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshTokenController)
userRouter.get('/user-details',auth,userDetails)


export default userRouter;