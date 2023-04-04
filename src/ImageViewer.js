import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageViewer.css";

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

          return { imagePath, faceName };
        })
      );

      // Filter images to only include those with a valid faceName
      const validImages = imageMetadata.filter(
        (image) =>
          image.faceName !== "" &&
          image.faceName !== "?" &&
          image.faceName !== "unknownn"
      );

      setImages(validImages);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const getLastWord = (str) => {
    const words = str.split(" ");
    return words[words.length - 1];
  };

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
            <p>{getLastWord(image.faceName)}</p>
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default ImageViewer;
