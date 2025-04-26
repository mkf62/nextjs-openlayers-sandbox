from flask import Flask
from flask_cors import CORS
from flaskAPI.config import config
from dotenv import load_dotenv, find_dotenv
from flaskAPI.blueprints.main import main
import os

load_dotenv(find_dotenv(".flaskenv"))

def create_app():
    app = Flask(__name__)
    
    env = os.environ.get("FLASK_ENV", "development")
    app.config.from_object(config[env])

    #Enable CORS
    CORS(app)

    # Register blueprints
    app.register_blueprint(main, url_prefix="/main")

    return app