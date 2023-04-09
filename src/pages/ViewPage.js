import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ImageViewer.css";
import { Card, Input, Button, Popconfirm, message } from "antd";

const ImageCard = ({ imagePath, faceName, faceKey, onDelete, onModify }) => {
  const handleModify = async () => {
    const newFaceName = prompt("Enter new name for the image:", faceName);
    if (newFaceName) {
      onModify(faceKey, newFaceName);
    }
  };

  const gridStyle = {
    width: "20%",
    textAlign: "center",
  };

  return (
    <Card.Grid style={gridStyle}>
      <div className="image-container">
        <img className="image" src={imagePath} alt={`img-${faceKey}`} />
        <br />
        <span
          style={{
            marginBottom: "5px",
            display: "inline-block",
            marginTop: "5px",
          }}
        >
          {faceName}
        </span>
        <div>
          <Popconfirm
            title="Are you sure to delete this image?"
            onConfirm={() => onDelete(faceKey)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </div>
        <Button onClick={handleModify}>Modify</Button>
      </div>
    </Card.Grid>
  );
};

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

            return {
              imagePath: imageFiles(`./${imagePath}`),
              faceName,
              faceKey,
            };
          })
        );

        // Filter images to only include those with a valid faceName
        const validImages = imageMetadata.filter(
          (image) =>
            image.faceName !== "" &&
            image.faceName !== "??" &&
            image.faceName !== "unknownn"
        );

        setImages(validImages);
        setLoading(false);
      }, 1000);
    };

    fetchImages();
  }, []);

  const deleteImage = async (faceKey) => {
    try {
      await axios.delete("/delete_image", { params: { faceKey } });
      setImages(images.filter((image) => image.faceKey !== faceKey));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const modifyImageMetadata = async (faceKey, newFaceName) => {
    try {
      const response = await axios.put("/modify_image_metadata", {
        faceKey,
        newFaceName,
      });

      if (response.data.status === "success") {
        message.success("Image metadata updated successfully");
        setImages(
          images.map((image) =>
            image.faceKey === faceKey
              ? { ...image, faceName: newFaceName }
              : image
          )
        );
      } else {
        message.error("Failed to update image metadata");
      }
    } catch (error) {
      message.error("Failed to update image metadata");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.faceName.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div>
      <Input
        placeholder="Search for name"
        value={search}
        onChange={handleSearch}
        style={{ width: 200, marginBottom: 20 }}
      />
      <div className="image-viewer">
        {loading ? (
          <div className="loading-container">
            <h1>Loading Images...</h1>
            <div className="spinner"></div>
          </div>
        ) : filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <ImageCard
              key={index}
              imagePath={image.imagePath}
              faceName={image.faceName}
              faceKey={image.faceKey}
              onDelete={deleteImage}
              onModify={modifyImageMetadata}
            />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
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
