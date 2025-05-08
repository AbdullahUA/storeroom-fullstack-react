

const forgotPasswordTemplate = ({name, otp}) => {

return `
<div>
<p>Dear ${name},</p>
<p>We received a request to reset your password. Please click the link below to reset your password:</p>

<div style="background-color: #f1f1f1; padding: 10px; border-radius: 5px; width: fit-content;">
<p style="font-size: 20px; font-weight: bold; color: #333;">Your OTP is:</p>
<p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
</div>
<p> This otp is valid for 1 hour only. Enter this otp in the Stroreroom website to proceed with resetting your password  </p>
<br>
<br>
<p>Thank you for using our service!</p>
<p>If you did not request a password reset, please ignore this email.</p>
<p>Storeroom Team</p>


</div>

`
}

export default forgotPasswordTemplate