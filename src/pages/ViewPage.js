import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ImageViewer.css";
import { Card, Input } from "antd";

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridStyle = {
    width: "20%",
    textAlign: "center",
  };
  useEffect(() => {
    const fetchImages = async () => {
      setTimeout(async () => {
        const imageFiles = require.context("../../faces", true, /\.(png)$/);
        const imagePaths = imageFiles
          .keys()
          .map((key) => key.replace("./", ""));

        const imageMetadata = await Promise.all(
          imagePaths.map(async (imagePath) => {
            const faceKey = imagePath.split("/").pop().split(".")[0];
            const response = await axios.get("/get_face_name", {
              params: { faceKey },
            });
            const faceName = response.data.faceName || "";

            return { imagePath: imageFiles(`./${imagePath}`), faceName };
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
      }, 1000);
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
          <Card.Grid style={gridStyle}>
            <div className="image-container" key={index}>
              <img
                className="image"
                src={image.imagePath}
                alt={`img-${index}`}
              />
              <br />
              {getLastWord(image.faceName)}
            </div>
          </Card.Grid>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export const ViewPage = () => (
  <>
    <Card title="People">
      <ImageViewer />
    </Card>
  </>
);
