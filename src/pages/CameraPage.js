// import * as React from "react";
// import Webcam from "react-webcam";
import * as ReactDOM from 'react-dom';
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {Button, Card, Drawer, Input} from "antd";
//
// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user"
// };
//
// export const CameraPage = () =>{
//     // ReactDOM.render(
//     // <Webcam />,
//     // document.getElementById('root')
//     // );
//   //   ReactDOM.render(
//   //   <Webcam
//   //   audio={false}
//   //   height={720}
//   //   screenshotFormat="image/jpeg"
//   //   width={1280}
//   //   videoConstraints={videoConstraints}
//   // >
//   //   {({ getScreenshot }) => (
//   //     <button
//   //       onClick={() => {
//   //         const imageSrc = getScreenshot()
//   //       }}
//   //     >
//   //       Capture photo
//   //     </button>
//   //   )}
//   // </Webcam>,
//   //   document.getElementById('root')
//   //   );
//
//     // const webcamRef = React.useRef(null);
//     //   const capture = React.useCallback(
//     //     () => {
//     //       const imageSrc = webcamRef.current.getScreenshot();
//     //     },
//     //     [webcamRef]
//     //   );
//     const webcamRef = React.useRef(null);
//       const capture = React.useCallback(
//         () => {
//           const imageSrc = webcamRef.current.getScreenshot();
//         },
//         [webcamRef]
//       );
//
//   return (
//     <>
//       <Webcam
//         audio={false}
//         height={720}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={720}
//         videoConstraints={videoConstraints}
//       />
//       <Button variant="contained" onClick={capture}>
//       capture photo
//     </Button>
//     </>
//   );
//
//
//
// }
import React, {createRef, useRef, useState,useEffect} from "react";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 720,
  height: 480,
  facingMode: "user"
};


export const CameraPage = () =>{
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  ///////////
 let [imageSrc, setImageSrc] = useState('');
 const [rects, setRects] = useState([]);
 const [faces, setFaces] = useState([]);
 const [modifyFace, setModifyFace] = useState({});
 ////////////

  // const capture_recognize = React.useCallback(() => {
  //   imageSrc = webcamRef.current.getScreenshot();
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   const img = new Image();
  //
  //   const cropHelperCanvas = document.createElement('canvas');
  //   const cropHelperCanvasCtx = cropHelperCanvas.getContext('2d');
  //
  //   img.src = imageSrc;
  //
  //   img.onload = () => {
  //     ctx.canvas.width = img.width;
  //     ctx.canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);
  //
  //   };
  //
  //
  //   const setFaceNameAtIndex = (name, index) => {
  //     console.log(faces);
  //   };
  //
  // }, [webcamRef, canvasRef]);

  const capture_recognize = async () => {
      //const imageSrc = webcamRef.current.getScreenshot();
      //const blob = await fetch(imageSrc).then((res) => res.blob());

      const form = new FormData();

      //form.append("img", blob, "screenshot.png");
      //instead of blob, let stay with file
      const webcam_canvas = webcamRef.current.getCanvas();
      const dataUrl = webcam_canvas.toDataURL('image/jpeg');
      const binaryData = atob(dataUrl.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
      }

      const f = new File([arrayBuffer], 'temp.jpeg', {type: 'image/jpeg'});

      form.append('img', f, f.name);
      console.log(f, "+", f.name);

      axios
          .post("/image", form)
          .then((resp) => {
              setImageSrc(URL.createObjectURL(f));
              setRects(resp.data);
          })
          .catch((error) => {
              console.error("Error:", error);
          });

      const img = new Image();
      img.src = imageSrc;
      const canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      // let ctx = null;
      const cropHelperCanvas = document.createElement('canvas');
      const cropHelperCanvasCtx = cropHelperCanvas.getContext('2d');


      img.onload = () => {
          ctx.canvas.width = img.width;
          ctx.canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          /////////
          let localFaces = [...faces];
          for (const r of rects) {
              const width = r[1] - r[3];
              const height = r[2] - r[0];
              ctx.beginPath();
              ctx.lineWidth = '2';
              ctx.rect(r[3], r[0], width, height);
              ctx.stroke();
              ctx.closePath();

              const face = ctx.getImageData(r[3], r[0], width, height);

              cropHelperCanvas.width = width;
              cropHelperCanvas.height = height;
              cropHelperCanvasCtx.rect(0, 0, width, height);
              cropHelperCanvasCtx.fill();
              cropHelperCanvasCtx.putImageData(face, 0, 0);

              const key = uuidv4().replaceAll('-', '');
              const imgData = cropHelperCanvas.toDataURL('image/png');
              const inputRef = createRef();
              const currentFace = {
                  key, imgData, name: '??', inputRef,
              };
              const currentFaceIdx = localFaces.length
              localFaces = [
                  ...localFaces,
                  currentFace];

              axios.post('/recon_name', {
                  faceImg: imgData,
              }).then((resp) => {
                  if (resp.data !== '?') {
                      document.getElementById(`input-${key}`).value = resp.data;
                      setModifyFace({index: currentFaceIdx, name: resp.data});
                  }
                  // TODO: set age here from API

              });
              setFaces(localFaces);


          }
          ////////

      };

  };

    const handleFaceClick = (fIndex) => {
    faces[fIndex].inputRef.current.focus({
      cursor: 'all',
    });
  };

/*
    useEffect(() => {
    img.src = imageSrc;

  }, [imageSrc]);

  useEffect(() => {
    if (modifyFace.index !== undefined) {
      const theFace = faces[modifyFace.index];
      theFace.name = modifyFace.name;
      setFaces([
        ...faces.slice(0, modifyFace.index),
        theFace,
        ...faces.slice(modifyFace.index + 1, faces.length)]);

      setModifyFace({});
    }
  }, [faces, modifyFace]);
*/




  const saveImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "captured-image.png";
    a.click();
  };

  return (
    <>
      <Button variant="contained" onClick={capture_recognize}>Capture and Recognize</Button>
      <Button variant="contained" onClick={saveImage}>Download Image</Button>
      <br/>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="webcam"
        videoConstraints={videoConstraints}
      />
        <br/>


      <canvas ref={canvasRef} className="canvas" />
        <Drawer
            title={'Faces'}
            placement={'bottom'}
            mask={false}
            closable={false}
            visible={true}
            getContainer={false}
            style={{position: 'absolute', height: '160px'}}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
            justifyContent: 'center',
          }}>
            {faces.map((f, fIdx) => (<Card
                key={`face-cards-${f.key}-${f.name}`}
                size={'small'}
                onClick={() => handleFaceClick(fIdx)}
                style={{width: '120px'}}
                hoverable={true}
                cover={<img src={f.imgData} alt={`face-${f.name}`}/>}>
              <Card.Meta
                  title={<Input
                      style={{textAlign: 'center'}}
                      ref={f.inputRef}
                      onBlur={(ev) => {
                        const {key, imgData} = faces[fIdx];
                        axios.put('/face', {
                          faceImg: imgData,
                          faceKey: key,
                          faceName: ev.target.value,
                        }).then((resp) => {
                          console.log(resp.data);
                        });
                      }}
                      id={`input-${f.key}`}
                      defaultValue={f.name}/>} description={''}/>
            </Card>))}
          </div>
        </Drawer>
    </>
  );
};