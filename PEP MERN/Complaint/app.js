import express from 'express';
import router from './routes/complaint.routes.js';
import logger from './middleware/auth.middleware.js';
import auth from './middleware/auth.middleware.js';
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api',auth,router);
export default app;