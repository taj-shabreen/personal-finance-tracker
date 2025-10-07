import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load variables from .env file
load_dotenv()

# Get Mongo URI from .env (recommended)
MONGO_URI = os.getenv("MONGO_URI")

# If not found, fallback directly (not recommended for production)
if not MONGO_URI:
    MONGO_URI = "YOUR_URI_HERE"

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["finance_tracker"]  # Database name
