import base64
import json
import os.path
import threading
from io import BytesIO
import sys
import face_recognition
from PIL import Image
from PIL.PngImagePlugin import PngInfo
from flask import Flask, request, Response
from flask_cors import CORS
import cv2
import numpy as np
from flask import jsonify


faces_path = 'faces'

app = Flask(__name__)
CORS(app)
stop_flag = False
process_this_frame = True
freeze = False
obama_image = face_recognition.load_image_file("obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]


biden_image = face_recognition.load_image_file("biden.jpg")
biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

face_names = ["Barack Obama", "Joe Biden"]
face_encodings = [obama_face_encoding, biden_face_encoding]
face_keys = []



@app.route('/delete_image', methods=['DELETE'])
def delete_image():
    face_key = request.args.get('faceKey')
    face_file_path = os.path.join(faces_path, f'{face_key}.png')

    if os.path.exists(face_file_path):
        os.remove(face_file_path)
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": "Image not found"})


@app.route('/modify_image_metadata', methods=['PUT'])
def modify_image_metadata():
    face_key = request.json['faceKey']
    new_face_name = request.json['newFaceName']
    face_file_path = os.path.join(faces_path, f'{face_key}.png')

    if os.path.exists(face_file_path):
        with Image.open(face_file_path) as face_file:
            metadata = PngInfo()
            metadata.add_text("FaceName", new_face_name)
            face_file.save(face_file_path, pnginfo=metadata)
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": "Image not found"})


# Add the new API route
@app.route('/get_face_name', methods=['GET'])
def get_face_name():
    face_key = request.args.get('faceKey')
    face_file_path = os.path.join(faces_path, f'{face_key}.png')

    if os.path.exists(face_file_path):
        with Image.open(face_file_path) as face_file:
            face_name = face_file.text.get('FaceName', 'unknown')
            return jsonify({"faceName": face_name})
    else:
        return jsonify({"faceName": '?'})


@app.route('/image', methods=['POST', 'GET'])
def upload_image():
    global stop_flag
    stop_flag = True
    img_file = request.files['img']

    image = face_recognition.load_image_file(img_file)
    face_locations = face_recognition.face_locations(image)
    stop_flag = False
    return json.dumps(face_locations)


@app.route('/face', methods=['PUT'])
def upload_face():
    global stop_flag
    stop_flag = True
    face_key = request.json['faceKey']
    face_img = request.json['faceImg'].split(',')[1]
    face_name = request.json['faceName']

    face_file_path = os.path.join(faces_path, f'{face_key}.png')
    with open(face_file_path, 'wb') as face_file:
        image_bytes = base64.b64decode(face_img)
        face_file.write(image_bytes)

    with Image.open(face_file_path) as face_file:
        metadata = PngInfo()
        metadata.add_text("FaceName", face_name)
        face_file.save(face_file_path, pnginfo=metadata)
    stop_flag = False
    return 'success'


recon_lock = threading.Lock()


@app.route('/recon_name', methods=['POST'])
def recon_name():
    global stop_flag
    stop_flag = True

    face_img = request.json['faceImg'].split(',')[1]

    with recon_lock:
        for f in os.listdir(faces_path):
            key = f.split('.')[0]
            if key in face_keys:
                continue

            face_keys.append(key)

            face_file_path = os.path.join(faces_path, f)
            with Image.open(face_file_path) as face_file:
                face_names.append(face_file.text['FaceName'])

            known_image = face_recognition.load_image_file(face_file_path)
            known_encoding = face_recognition.face_encodings(known_image)[0]

            face_encodings.append(known_encoding)

        image_bytes = base64.b64decode(face_img)
        face_obj = BytesIO(image_bytes)
        face_image = face_recognition.load_image_file(face_obj)
        face_encoding = face_recognition.face_encodings(face_image)[0]

        distances = face_recognition.face_distance(
            face_encodings, face_encoding)

    distances = distances.tolist()

    min_distance_idx = -1
    if len(distances) != 0:
        min_distance = 1

        for i in range(len(distances)):
            if distances[i] < 0.5 and distances[i] < min_distance:
                min_distance = distances[i]
                min_distance_idx = i

    if min_distance_idx != -1:
        stop_flag = False
        return face_names[min_distance_idx]
    stop_flag = False
    return '?'


@app.route('/webcam_realtime')
def webcam_realtime():
    video_capture = cv2.VideoCapture(0)
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()
        rgb_frame = frame[:, :, ::-1]
        face_locations_webcam = face_recognition.face_locations(rgb_frame)
        face_encodings_webcam = face_recognition.face_encodings(
            rgb_frame, face_locations_webcam)
        for (top, right, bottom, left), face_encoding in zip(face_locations_webcam, face_encodings_webcam):
            matches = face_recognition.compare_faces(
                face_encodings, face_encoding)
            name = "Unknown"
            face_distances_webcam = face_recognition.face_distance(
                face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances_webcam)
            face_distances_webcam = face_distances_webcam.tolist()

            min_distance_idx = -1
            if len(face_distances_webcam) != 0:
                min_distance = 1

                for i in range(len(face_distances_webcam)):
                    if face_distances_webcam[i] < 0.5 and face_distances_webcam[i] < min_distance:
                        min_distance = face_distances_webcam[i]
                        min_distance_idx = i
            if min_distance_idx != -1:
                name = face_names[min_distance_idx]

            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            cv2.rectangle(frame, (left, bottom - 35),
                          (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6),
                        font, 1.0, (255, 255, 255), 1)
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    video_capture.release()
    cv2.destroyAllWindows()


@app.route('/test_func_0')
def test_func():
    global process_this_frame
    global stop_flag
    while not stop_flag:
        video_capture = cv2.VideoCapture(0)
        while True:
            # sys.exit(0)
            # Grab a single frame of video
            ret, frame = video_capture.read()
            if not ret:
                break
            else:
                small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
                rgb_frame = small_frame[:, :, ::-1]
                face_locations_webcam = face_recognition.face_locations(
                    rgb_frame)
                face_encodings_webcam = face_recognition.face_encodings(
                    rgb_frame, face_locations_webcam)
                for (top, right, bottom, left), face_encoding in zip(face_locations_webcam, face_encodings_webcam):
                    top *= 4
                    right *= 4
                    bottom *= 4
                    left *= 4
<<<<<<< HEAD
                    #name = None
=======
                    name = None
>>>>>>> 8009c6d2b174ca3b89930f267447f95db4b8557a
                    if True:
                        #matches = face_recognition.compare_faces(face_encodings, face_encoding)
                        name = "Unknown"
                        face_distances_webcam = face_recognition.face_distance(
                            face_encodings, face_encoding)
                        #best_match_index = np.argmin(face_distances_webcam)
                        face_distances_webcam = face_distances_webcam.tolist()
                        min_distance_idx = -1
                        if len(face_distances_webcam) != 0:
                            min_distance = 1

                            for i in range(len(face_distances_webcam)):
                                if face_distances_webcam[i] < 0.5 and face_distances_webcam[i] < min_distance:
                                    min_distance = face_distances_webcam[i]
                                    min_distance_idx = i

                        if min_distance_idx != -1:
                            name = face_names[min_distance_idx]
                        else:
                            name = "unknown"
                    process_this_frame = not process_this_frame
                    cv2.rectangle(frame, (left, top),
                                  (right, bottom), (0, 0, 255), 2)
                    cv2.rectangle(frame, (left, bottom - 35),
                                  (right, bottom), (0, 0, 255), cv2.FILLED)
                    font = cv2.FONT_HERSHEY_DUPLEX
                    cv2.putText(frame, name, (left + 6, bottom - 6),
                                font, 1.0, (255, 255, 255), 1)

                success, buffer = cv2.imencode('.jpg', frame)
                frame_bytes = buffer.tobytes()

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
                while freeze:
                    print("paused")
                    if stop_flag:
                        stop_flag = False
                        break

                if freeze:
                    break

            if stop_flag:
                stop_flag = False
                break

        video_capture.release()
        cv2.destroyAllWindows()


@app.route('/test_func')
def stream():
    global stop_flag
    if not stop_flag:
        return Response(test_func(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/stream_pause')
def stream_pause():
    global freeze
    freeze = not freeze
    print(freeze)
    return 'pause/resume'


@app.route('/stream_stop')
def stream_stop():
    global stop_flag
    stop_flag = not stop_flag
    print(stop_flag)
    return 'Stop'


app.run()
#test comment
