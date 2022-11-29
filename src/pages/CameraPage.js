import * as React from "react";
import Webcam from "react-webcam";
import * as ReactDOM from 'react-dom';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export const CameraPage = () =>{
    // ReactDOM.render(
    // <Webcam />,
    // document.getElementById('root')
    // );
  //   ReactDOM.render(
  //   <Webcam
  //   audio={false}
  //   height={720}
  //   screenshotFormat="image/jpeg"
  //   width={1280}
  //   videoConstraints={videoConstraints}
  // >
  //   {({ getScreenshot }) => (
  //     <button
  //       onClick={() => {
  //         const imageSrc = getScreenshot()
  //       }}
  //     >
  //       Capture photo
  //     </button>
  //   )}
  // </Webcam>,
  //   document.getElementById('root')
  //   );

    const webcamRef = React.useRef(null);
      const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
      );
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );

}