from flask import Blueprint, current_app, Response, jsonify

# Define the blueprint
main = Blueprint("main", __name__)

@main.route("/hello-world", methods=['GET'])
def hello_world():
    return jsonify({"msg": "Hello from the backend!"}), 200