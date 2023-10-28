# make sure to pip install firebase-admin

# ANDREW: make sure to: put PATH_TO_FIREBASE_JSON in .env file
# import firebase_admin
from firebase_admin import credentials, initialize_app, storage

from dotenv import load_dotenv
import os


def get_file(cred, bucket_name, remote_storage_path, destination_file):

    initialize_app(cred, {'storageBucket': 'calhacks-10.appspot.com'})

    storage_client = storage.bucket(bucket_name)
            
    # Get a reference to the file you want to download
    blob = storage_client.blob(remote_storage_path)

    # Download the file to the local path
    blob.download_to_filename(destination_file)

# example:
load_dotenv()

cred = credentials.Certificate(os.getenv("PATH_TO_FIREBASE_JSON"))
bucket_name = "calhacks-10.appspot.com"
remote_storage_path = "test-user-1/test-session-1/test_audio.mp3"
destination_file = "/Users/ryanlee/Desktop/Repos/aurora/backend/test_audio.mp3"

get_file(cred, bucket_name, remote_storage_path, destination_file)