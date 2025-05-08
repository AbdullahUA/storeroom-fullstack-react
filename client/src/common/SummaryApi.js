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
    
}

export default SummaryApi;