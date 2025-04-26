from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(".env"))

class Config(object):
    """
    Base Configuration
    """

    # Put any environment variables common between dev and prod here

class DevelopmentConfig(Config):
    """
    Local Dev Configuration
    Requires `FLASK_ENV=dev`
    """

    DEBUG = True

class ProductionConfig(Config):
    """
    Production Configuration
    Requires `FLASK_ENV=prod`
    """
    
    DEBUG = False

config = {
    "dev": DevelopmentConfig,
    "prod": ProductionConfig
}
