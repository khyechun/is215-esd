from flask import Flask, request, jsonify
import requests
from invokes import invoke_http
 
app = Flask(__name__)
 
@app.route("/api/getItems")
def get_all():
    url = "http://localhost:8088/api/item_api/getAllItems"

    response = invoke_http(url, method='GET')
    print(response)
    return jsonify(response)
 

if __name__ == '__main__':
    app.run(port=8094, debug=True)