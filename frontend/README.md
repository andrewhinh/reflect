# Frontend

Built with:

- React for the frontend framework
- Vite for the build tool
- Vercel for deployment

## Setup

Install dependencies:

   ```bash
   npm install
   ```

Create a `.env` file:

   ```bash
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

To manually deploy the production build to Vercel:

   ```bash
   make deploy
   ```
