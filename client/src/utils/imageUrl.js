// utils/getimageUrl.js
export const getImageURL = (image) => {
    // If already a full URL (maybe user logged in with Google or uploaded elsewhere)
    if (!image) {
      return "/imgs/placeholder-img.png";
    }
    if (image.startsWith("https")) {
      return image;
    } 
      return "/imgs/placeholder-img.png";
  };
  