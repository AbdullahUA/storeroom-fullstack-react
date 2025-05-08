import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
})
const uploadImageCloudinary = async (image) => {
    try {
        const buffer = image.buffer || Buffer.from(await image.arrayBuffer());
        const uploadImage=await new Promise((res,rej)=>{
            cloudinary.uploader.upload_stream({ folder:"Storeroom" }, (error, uploadResult) => {
                if (error) {
                    rej(error);
                } else {
                   return res(uploadResult);
                }
            }).end(buffer);
        })

        return uploadImage

    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Image upload failed');
    }
    }

    export default uploadImageCloudinary;