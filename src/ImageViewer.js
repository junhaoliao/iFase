import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageViewer.css";

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to capitalize the first letter of each word in a string
  const capitalizeEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imageFiles = require.context("../faces", true, /\.(png)$/);
      const imagePaths = imageFiles.keys().map(imageFiles);

      const imageMetadata = await Promise.all(
        imagePaths.map(async (imagePath) => {
          const faceKey = imagePath.split("/").pop().split(".")[0];
          const response = await axios.get("/get_face_name", {
            params: { faceKey },
          });
          const faceName = response.data.faceName || "";

          // Capitalize the first letter of each word in the face name
          const formattedFaceName =
            /^[a-zA-Z]/.test(faceName) && faceName !== "?"
              ? capitalizeEachWord(faceName).split(" ").pop()
              : "";

          return { imagePath, faceName: formattedFaceName };
        })
      );

      setImages(imageMetadata);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="image-viewer">
      {loading ? (
        <div className="loading-container">
          <h1>Loading Images...</h1>
          <div className="spinner"></div>
        </div>
      ) : images.length > 0 ? (
        images.map((image, index) => (
          <div className="image-container" key={index}>
            <img className="image" src={image.imagePath} alt={`img-${index}`} />
            <p>{image.faceName}</p>
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default ImageViewer;
