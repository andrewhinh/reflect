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
   JWT_SECRET=$(openssl rand -hex 32)
   echo "JWT_SECRET=$JWT_SECRET" >> .env
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
   make run
   ```

To manually deploy the backend to Heroku:

   ```bash
   make deploy
   ```
