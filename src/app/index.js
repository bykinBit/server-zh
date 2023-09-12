import path from "path";
import express, { json, urlencoded } from "express";
import registerRouter from "../router/index.js";
import errorMiddleware from "../middleware/errMiddleware.js";
import HttpException from "../exception/httpException.js";
const app = express();

app.use(json()); //json=bodypaser
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "")));
app.registerRouter = registerRouter;
app.registerRouter();

app.use((_req, _res, next) => {
  const error = new HttpException(404, "没有找到匹配的路由");
  next(error);
});

app.use(errorMiddleware);
export default app;
