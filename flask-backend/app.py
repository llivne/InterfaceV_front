from flask import Flask, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"], supports_credentials=True)

rows_topics = [
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

counter = len(rows_topics)

rows_devices = [
    {
      "id": 1,
      "deviceName": "A",
      "batchingTime": 5,
      "batchingNumber": 35,
      
    },
    { "id": 2, "deviceName": "B", "batchingTime": 125, "batchingNumber": 142 },
    { "id": 3, "deviceName": "C", "batchingTime": 25, "batchingNumber": 45 },
    { "id": 4, "deviceName": "D", "batchingTime": 35, "batchingNumber": 16 },
    { "id": 5, "deviceName": "E", "batchingTime": 45, "batchingNumber": None },
    { "id": 6, "deviceName": "F", "batchingTime": None, "batchingNumber": 50 },
    { "id": 7, "deviceName": "G", "batchingTime": 55, "batchingNumber": 44 },
  ]

@app.route("/")
def home():
    return "<h1>Hello, Flask!</h1>"

@app.route("/login")
def login():
    return json.dumps(True)

@app.route("/topics", methods=['GET', 'POST', 'PATCH'])
def topics():
    if request.method == 'GET':
        return rows_topics
    
    if request.method == 'POST':
        new_item = request.json["new_item"]

        if not new_item or not new_item["topicName"] \
            or not new_item["batchingTime"] or not new_item["batchingNumber"]:
            return "Failure"
        
        global counter
        counter = counter + 1

        item_to_add = {
            "id": counter,
            "topicName": new_item["topicName"],
            "batchingTime": new_item["batchingTime"], 
            "batchingNumber": new_item["batchingNumber"]
        }
        rows_topics.append(item_to_add)
        return "Success"
    
    if request.method == "PATCH":
        updated_item = request.json["updated_item"]
        item_in_list = find_dict_by_id(rows_topics, updated_item["id"])

        item_in_list.update(updated_item)
        return "Success"
    

@app.route("/topics/<int:item_to_delete_id>", methods=['DELETE'])
def topics_del(item_to_delete_id):
    print(item_to_delete_id)
    for i in range(len(rows_topics)):
        if rows_topics[i]['id'] == item_to_delete_id:
            del rows_topics[i]
            return "Success"

    return "Failure"


@app.route("/devices")
def devices():
    return rows_devices


def find_dict_by_id(lst, target_id):
    for dic in lst:
        if dic['id'] == target_id:
            return dic
    return None  # Return None if the id is not found