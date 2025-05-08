import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.RESEND_API) {
  throw new Error('RESEND_API is not defined in .env file');
}

const resend = new Resend(process.env.RESEND_API)
const sendEmail = async({sendTo, subject, html}) => {
try {
  const { data, error } = await resend.emails.send({
    from: 'Storeroom <onboarding@resend.dev>',
    to: sendTo,
    subject: subject,
    html: html,
  });

    if(error){
        return console.log({error})
    }

    return data
}catch (error) {
  console.error('Error sending email:', error);
}
}


export default sendEmail