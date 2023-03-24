import base64
import json
import os.path
import threading
from io import BytesIO

import face_recognition
from PIL import Image
from PIL.PngImagePlugin import PngInfo
from flask import Flask, request
import cv2
import numpy as np
faces_path = 'faces'

app = Flask(__name__)

face_names = []
face_encodings = []
face_keys = []

@app.route('/image', methods=['POST','GET'])
def upload_image():
    img_file = request.files['img']

    image = face_recognition.load_image_file(img_file)
    face_locations = face_recognition.face_locations(image)

    return json.dumps(face_locations)

@app.route('/face', methods=['PUT'])
def upload_face():
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

    return 'success'

recon_lock = threading.Lock()

@app.route('/recon_name', methods=['POST'])
def recon_name():
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

        distances = face_recognition.face_distance(face_encodings, face_encoding)

    distances = distances.tolist()

    min_distance_idx = -1
    if len(distances) != 0:
        min_distance = 1

        for i in range(len(distances)):
            if distances[i] < 0.8 and distances[i] < min_distance:
                min_distance = distances[i]
                min_distance_idx = i

    if min_distance_idx != -1:
        return face_names[min_distance_idx]
    return '?'

@app.route('/webcam_realtime')
def webcam_realtime():
    video_capture = cv2.VideoCapture(0)
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()
        rgb_frame = frame[:, :, ::-1]
        face_locations_webcam = face_recognition.face_locations(rgb_frame)
        face_encodings_webcam = face_recognition.face_encodings(rgb_frame, face_locations_webcam)
        for (top, right, bottom, left), face_encoding in zip(face_locations_webcam, face_encodings_webcam):
            matches = face_recognition.compare_faces(face_encodings, face_encoding)
            name = "Unknown"
            face_distances_webcam = face_recognition.face_distance(face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances_webcam)
            if matches[best_match_index]:
                name = face_names[best_match_index]

            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        video_capture.release()
        cv2.destroyAllWindows()

app.run()
#test comment
