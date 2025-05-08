const verifyEmailTemplate = ({name,url}) => {
    return `<p>Dear ${name},</p>
    <a href="${url}">Verify your email</a>`


}

export default verifyEmailTemplate