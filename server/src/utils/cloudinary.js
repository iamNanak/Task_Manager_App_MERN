import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      // console.error("No file path provided");
      return null;
    }

    // if (!fs.existsSync(localFilePath)) {
    //   console.error("File does not exist:", localFilePath);
    //   return null;
    // }

    console.log("Uploading file to Cloudinary:", localFilePath);

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file uploaded successfully
    console.log("File is Uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    // console.error("Cloudinary error details:", error.response?.data);

    // Remove the locally saved temporary file in case of an error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
