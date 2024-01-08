from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"], supports_credentials=True)

@app.route("/")
def home():
    return "<h1>Hello, Flask!</h1>"

@app.route("/topics")
def topics():
    rows = [
    {
      "id": 1,
      "topicName": "A",
      "batchingTime": 5,
      "batchingNumber": 35,
      
    },
    { "id": 2, "topicName": "B", "batchingTime": 25, "batchingNumber": 42 },
    { "id": 3, "topicName": "C", "batchingTime": 5, "batchingNumber": 45 },
    { "id": 4, "topicName": "D", "batchingTime": 5, "batchingNumber": 16 },
    { "id": 5, "topicName": "E", "batchingTime": 5, "batchingNumber": None },
    { "id": 6, "topicName": "F", "batchingTime": None, "batchingNumber": 150 },
    { "id": 7, "topicName": "G", "batchingTime": 5, "batchingNumber": 44 },
  ]
    return rows

@app.route("/devices")
def devices():
    rows = [
    {
      "id": 1,
      "topicName": "A",
      "batchingTime": 5,
      "batchingNumber": 35,
      
    },
    { "id": 2, "topicName": "B", "batchingTime": 125, "batchingNumber": 142 },
    { "id": 3, "topicName": "C", "batchingTime": 25, "batchingNumber": 45 },
    { "id": 4, "topicName": "D", "batchingTime": 35, "batchingNumber": 16 },
    { "id": 5, "topicName": "E", "batchingTime": 45, "batchingNumber": None },
    { "id": 6, "topicName": "F", "batchingTime": None, "batchingNumber": 50 },
    { "id": 7, "topicName": "G", "batchingTime": 55, "batchingNumber": 44 },
  ]
    return rows