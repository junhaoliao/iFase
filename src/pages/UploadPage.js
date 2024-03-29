import {Button,Card, Drawer,Input} from 'antd';
import axios from 'axios';
import {createRef, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Webcam from "react-webcam"
import * as ReactDOM from 'react-dom';

export const UploadPage = () => {

  const [imageSrc, setImageSrc] = useState('');
  const [rects, setRects] = useState([]);
  const [faces, setFaces] = useState([]);
  const [modifyFace, setModifyFace] = useState({});

  const handleButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (ev) => {
      const f = input.files[0];
      const form = new FormData();
      form.append('img', f, f.name);

      axios.post('/image', form).then((resp) => {
        setImageSrc(URL.createObjectURL(input.files[0]));
        setRects(resp.data);
      });
    };
    input.click();

  };
  let ctx = null;

  const img = new Image();
  const cropHelperCanvas = document.createElement('canvas');
  const cropHelperCanvasCtx = cropHelperCanvas.getContext('2d');

  const setFaceNameAtIndex = (name, index) => {
    console.log(faces);
  };

  img.onload = () => {
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

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

  };

  const handleFaceClick = (fIndex) => {
    faces[fIndex].inputRef.current.focus({
      cursor: 'all',
    });
  };

  useEffect(() => {
    ctx = document.getElementById('canvas').getContext('2d');
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

  return (<>
    <Button variant="contained" onClick={handleButtonClick}>
      Upload
    </Button>
    <Button variant="contained" onClick={handleButtonClick}>
      Capture
    </Button>
    <br/>
    <canvas id={'canvas'}/>
    <Drawer
        title={'Faces'}
        placement={'bottom'}
        mask={false}
        closable={false}
        visible={true}
        getContainer={false}
        style={{position: 'absolute', height: '320px'}}
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

  </>);
};