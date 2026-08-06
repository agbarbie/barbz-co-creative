import { app } from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Barbz & Co. Creative API running on http://localhost:${PORT}`);
});
