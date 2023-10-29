# Backend

Built with:

- Conda for Python package management
- FastAPI for the web framework
- Heroku for deployment

## Setup

Create the conda environment locally:

   ```bash
   make conda-update
   conda activate aurora
   ```

Set up the conda environment:

   ```bash
   make pip-tools
   make setup
   ```

Create a `.env` file:

   ```bash
   HUME_API_KEY=
   OPENAI_API_KEY=
   PATH_TO_FIREBASE_JSON=
   echo "HUME_API_KEY=$HUME_API_KEY" >> .env
   echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env
   echo "PATH_TO_FIREBASE_JSON=$PATH_TO_FIREBASE_JSON" >> .env
   ```

## Development

To bump transitive dependencies:

   ```bash
   make pip-tools-upgrade
   ```

To lint the code manually:

   ```bash
   make lint
   ```

To run all tests:

   ```bash
   make test
   ```

To run the backend locally,

   ```bash
   make dev
   ```

To manually deploy the backend to Heroku:

   ```bash
   make deploy
   ```
