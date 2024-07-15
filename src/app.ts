import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { router } from "./app/Routes/route";
import notFound from "./app/middleware/notFoundRoute";
import { globalErrorHandler } from "./app/middleware/globalErrorhandler";
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
