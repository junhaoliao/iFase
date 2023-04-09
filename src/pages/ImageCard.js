const ImageCard = ({ imagePath, faceName, faceKey, onDelete, onModify }) => {
    const [localFaceName, setLocalFaceName] = useState(faceName);
  
    const handleModify = () => {
      const newFaceName = prompt("Enter new name for the image:", localFaceName);
      if (newFaceName) {
        onModify(faceKey, newFaceName);
        setLocalFaceName(newFaceName);
      }
    };
  
    return (
      <Card.Grid style={gridStyle}>
        <div className="image-container">
          <img className="image" src={imagePath} alt={`img-${faceKey}`} />
          <br />
          {localFaceName}
          <Popconfirm
            title="Are you sure to delete this image?"
            onConfirm={() => onDelete(faceKey)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
          <Button onClick={handleModify}>Modify</Button>
        </div>
      </Card.Grid>
    );
  };
  