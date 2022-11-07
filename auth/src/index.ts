import express from 'express';
import { json } from 'body-parser';

// routes
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!!');
});
