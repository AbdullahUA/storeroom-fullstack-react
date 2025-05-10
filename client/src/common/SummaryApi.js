export const baseUrl = 'http://localhost:8080';

const SummaryApi = {
    register:{
        url:'/api/user/register',
        method:'POST',
    },
    login:{
        url:'/api/user/login',
        method:'POST'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'PUT'
    },
    forgot_password_otp_verification:{
        url:'api/user/verify-otp',
        method:'PUT'
    },
    reset_password:{
        url:'api/user/reset-password',
        method:'PUT'
    },
    refresh_token:{
        url:'api/user/refresh-token',
        method:'POST'
    }  
}

export default SummaryApi;