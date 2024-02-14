import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import connectDB from "./db";
import postsRoutes from './routes/postsRoutes';
import commentsRoutes from './routes/commentsRoutes';

const app: Express = express();
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.listen(port, () => {
  console.log(`Blogger app server is listening on port ${port} 🚀`)
});

app.get('/', async (req: Request, res: Response) => {
    res.send('hello api!')
});

app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);

app.all('*', (req: Request, res: Response) => {
  res.send('Something goes wrong...')
})


