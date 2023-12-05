import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user.route';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());
app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello mon!');
});

export default app;
