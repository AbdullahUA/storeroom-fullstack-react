import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    return error;
  }
};

export default uploadImage;