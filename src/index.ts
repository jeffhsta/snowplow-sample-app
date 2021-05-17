import express, { Request, Response } from 'express';
import snowplow from '@snowplow/node-tracker';

const port = parseInt(process.env.PORT || '8000')
const app = express();

app.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'example application'
  });
});

app.listen(port, (): void => {
  console.info({ message: `Server is running at port ${port}` })
});
