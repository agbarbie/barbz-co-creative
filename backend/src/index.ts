import { app } from './app.js';

const PORT = process.env.PORT || 4000;

// On Vercel the platform runs the app itself; only listen when running locally
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Barbz & Co. Creative API running on http://localhost:${PORT}`);
  });
}

// Vercel looks for the Express app as the default export
export default app;