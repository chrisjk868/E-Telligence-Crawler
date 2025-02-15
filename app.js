import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import apiv1Router from './routes/api/v1/apiv1.js';
import models from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(json({ limit: '10mb' }));
app.use(urlencoded({limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use('/api/v1', apiv1Router);

// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });

export default app;
