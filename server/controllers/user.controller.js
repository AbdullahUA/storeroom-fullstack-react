import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import dotenv from 'dotenv';
import sendEmail from '../config/sendEmail.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
dotenv.config()
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken'



export async function registerUserController(req,res){
    try{
        // Check if the request body contains the required fields
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please provide name, email and password",
                error: true,
                success: false,
            })
        }
        const user = await UserModel.findOne({email})
        if(user){
            return res.json({
                message: "User already exists",
                error: true,
                success: false,
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
    
    
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`

        // sending verification email link to the user email

     const verifyEmail= await sendEmail({
            sendTo: email,
            subject: "Welcome to Storeroom",
            html: verifyEmailTemplate({
                name: name,
                url: verifyEmailUrl
            })
        })



        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: newUser
        })


    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}    


export async function verifyEmailController(req,res){
    try{
        const {code} = req.body
        const user = await UserModel.findOne({_id: code})
        if(!user){
            return res.status(400).json({
                message: "Invalid  code",
                error: true,
                success: false,
            })
        }
       
       const updatedUser = await UserModel.updateOne({_id: code}, {
            verify_email: true
        })
       
        return res.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    } 
} 

// login user
export async function loginController(req,res){
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "Please provide email and password",
                error: true,
                success: false,
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Invalid email",
                error: true,
                success: false,
            })
        }
        if (!user.password) {
            return res.status(500).json({
                message: "User password missing",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                message: "Invalid Password",
                error: true,
                success: false,
            })
        }

        // check if the user status is active or not
        if(user.status !== "Active"){
            return res.status(400).json({
                message: "Your account is inactive contact Admin",
                error: true,
                success: false,
            })
        }
        // token generation and refresh token generation
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookiesOption = {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }

        // set the cookies in the response
        res.cookie("accessToken", accessToken, cookiesOption)
        res.cookie("refreshToken", refreshToken, cookiesOption)

        return res.status(200).json({
            message: "User logged in successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    } 
}

// logout user

export async function logoutController(req,res){
    try{
        const userId = req.userId // which is coming from the auth middleware
        if(!userId){
            return res.status(400).json({
                message: "User not foundddd",
                error: true,
                success: false,
            })
        }

          // Clear refresh token from cookie and database 
        const cookiesOption = {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }
        res.clearCookie("accessToken", cookiesOption)
        res.clearCookie("refreshToken", cookiesOption)

        const removeRefreshToken = await UserModel.updateOne({_id: userId},{refreshToken: ""})
        if(!removeRefreshToken){
            return res.status(400).json({
                message: "Unable to logout",
                error: true,
                success: false,
            })
        }

        return res.status(200).json({
            message: "User logged out successfully",
            error: false,
            success: true,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

// upload user image

export async function uploadUserImage(req,res){
    try{
      const userId = req.userId // which is coming from the auth middleware
        if(!userId){
                return res.status(400).json({
                    message: "User not found in middleware",
                    error: true,
                    success: false,
                })
            }
            // check if the user is present or not
            const user = await UserModel.findOne({_id: userId})
            if(!user){
                return res.status(400).json({
                    message: "User not found in database",
                    error: true,
                    success: false,
                })
            }

    const image = req.file
    console.log("image",image)
        if(!image){
            return res.status(400).json({
                message: "Please upload an image",
                error: true,
                success: false,
            })
        }

        const uploadImage=await uploadImageCloudinary(image)
        const updatedUser = await UserModel.updateOne({_id: userId}, {
            avatar: uploadImage.url
        })
        if(!updatedUser){
            return res.status(400).json({
                message: "Unable to upload image",
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: uploadImage
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    } 
}

// update user details

export async function updateUserDetails(req,res){
    try{
        const userId = req.userId // which is coming from the auth middleware
        if(!userId){
            return res.status(400).json({
                message: "User not found in middleware",
                error: true,
                success: false,
            })
        }
        // check if the user is present or not
        const user = await UserModel.findOne({_id: userId})
        if(!user){
            return res.status(400).json({
                message: "User not found in database",
                error: true,
                success: false,
            })
        }

        const {name,email,mobile,password} = req.body
        let updatedData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
          };
        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            updatedData.password = hashedPassword
        }

        const updatedUser = await UserModel.updateOne({_id: userId}, {$set:updatedData })
        if(!updatedUser){
            return res.status(400).json({
                message: "Unable to update user details",
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            message: "User details updated successfully",
            error: false,
            success: true,
            data: updatedUser
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

// forgot password not login
export async function forgotPasswordController(req,res){
    try{
        const {email} = req.body
        if(!email){
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User not found ",
                error: true,
                success: false,
            })
        }

        const otp = generatedOtp()
        const expireTime = Date.now() + 60 * 60 * 1000 // 1 hour
        const updatedUser = await UserModel.findOneAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()

        })

        

        // send email to user with the otp
        const sendOtp = await sendEmail({
            sendTo: email,
            subject: "Forgot Password OTP",
            html: forgotPasswordTemplate({name:user.name, otp: otp})
        })
        if(!sendOtp){
            return res.status(400).json({
                message: "Unable to send OTP",
                error: true,
                success: false,
            })
        }
        return res.status(200).json({
            message: "OTP sent to your email",
            error: false,
            success: true,
        })
        


       
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
    
}


// verify otp and reset password
export async function verifyOtpAndResetPassword(req,res){
    try{
        const {email,otp,password} = req.body
        if(!email || !otp || !password){
            return res.status(400).json({
                message: "Please provide email, otp and password",
                error: true,
                success: false,
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User not found ",
                error: true,
                success: false,
            })
        }

        // check if the otp is valid or not
        if(user.forgot_password_otp !== otp){
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false,
            })
        }

        // check if the otp is expired or not
        const currentTime = new Date().toISOString()
        if(user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false,
            })
        }

        // update the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const updatedUser = await UserModel.updateOne({_id:user._id}, {
            password: hashedPassword,
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })
        if(!updatedUser){
            return res.status(400).json({
                message: "Unable to update password",
                error: true,
                success: false,
            })
        }
        
        return res.status(200).json({
            message: "Password updated successfully",
            error: false,
            success: true,
        })
        

    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


// refresh token controller

export async function refreshTokenController(req,res){
    try{
        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]
        if(!refreshToken){
            return res.status(400).json({
                message: "Refresh token not found in cookies or header",
                error: true,
                success: false,
            })
        }
        const user = await UserModel.findOne({refreshToken})
        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false,
            })
        }
        // check if the refresh token is valid or not
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
            return res.status(400).json({
                message: "Token is expired",
                error: true,
                success: false,
            })
        }
        const newAccessToken = await generateAccessToken(user._id)

        const cookiesOption = {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }

        // set the cookies in the response
        res.cookie("accessToken", newAccessToken, cookiesOption)
    

        return res.status(200).json({
            message: "New Access token generated successfully",
            error: false,
            success: true,
            data: {
                accessToken:newAccessToken,
                
            }
         
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}