from flask import Flask, render_template, jsonify
import pymongo
import os

app = Flask(__name__)

conn = os.environ.get('MONGODB_URI')
if not conn:
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.WAQI_Data
    WAQI_info = db.WAQI_info

@app.route('/index')
def home():
    return render_template('index.html')

@app.route('/data')
def data(): 
    documents = db.WAQI_info.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return jsonify(response)
    

if __name__ == "__main__":
    app.run()