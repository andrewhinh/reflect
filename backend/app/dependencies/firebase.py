import uuid

from firebase_admin import storage


# For testing
# bucket_name = "calhacks-10.appspot.com"
# remote_storage_path = "test-user-1/test-session-1/test_video.webm"
def get_file(bucket_name, remote_storage_path):
    """Get file from Firebase Storage."""
    storage_client = storage.bucket(bucket_name)

    # Get a reference to the file you want to download
    blob = storage_client.blob(remote_storage_path)

    # Download the file to the local path
    file_type = remote_storage_path.split(".")[-1]
    dest_path = f"./{uuid.uuid4()}.{file_type}"
    blob.download_to_filename(dest_path)
    return dest_path
