# Frontend

Built with:

- React for the frontend framework
- Vite for the build tool
- Cloudflare Pages for deployment

## Setup

Install dependencies:

   ```bash
   npm install
   ```

Create a `.env` file:

   ```bash
   # Get a Giphy API key: https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key
   VITE_GIPHY_API_KEY=<your key here>
   echo "VITE_GIPHY_API_KEY=$VITE_GIPHY_API_KEY" >> .env
   VITE_API_URL=http://localhost:8000
   echo "VITE_API_URL=$VITE_API_URL" >> .env
   VITE_API_KEY=localhost
   echo "VITE_API_KEY=$VITE_API_KEY" >> .env
   ```

## Development

To lint the code:

   ```bash
   npm run lint
   ```

To run the frontend locally:

   ```bash
   npm run dev
   ```

To create a production build locally:

   ```bash
   npm run build
   ```

To preview the production build locally:

   ```bash
   npm run preview
   ```

To manually deploy the production build to Cloudflare Pages (deploys local state):

   ```bash
   make deploy
   ```
