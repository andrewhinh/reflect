# Backend

Built with:

- Conda for Python package management
- FastAPI for the web framework
- Heroku for deployment

## Setup

Either create the conda environment locally:

   ```bash
   make conda-update
   conda activate project
   ```

Or create the conda environment in a Docker container:

- In [this guide](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started):
  - [Install the prerequisites](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).
  - Then open the current working directory (`backend`) [in the container](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container).

Set up the conda environment:

   ```bash
   make pip-tools
   make setup
   ```

Create a `.env` file:

   ```bash
   # Get an OpenAI API key: https://platform.openai.com/signup
   OPENAI_API_KEY=<your key here>
   echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env
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

- In development mode:

   ```bash
   make run-dev
   ```

- In production mode:

   ```bash
   make run-prod
   ```

To manually deploy the backend to Heroku:

- For staging:

   ```bash
   make deploy-stag
   ```

- For production:

   ```bash
   make deploy-prod
   ```
