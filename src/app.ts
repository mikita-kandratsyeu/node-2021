import express, { Request, Response } from 'express';

const app = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Application working correctly with a TypeScript!');
});

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
