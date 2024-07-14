import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { router } from "./app/Routes/route";
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});


app.use('/api', router)
export default app;
