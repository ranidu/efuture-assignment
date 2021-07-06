import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import apiRouter from "./router/ApiRouter";
import server from "./db/Connection";

export function startServer() {
  const app = express();
  const APP_PORT = process.env.PORT || 9000;

  //bind request body to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //middlware lib to log incoming requests
  app.use(morgan("tiny"));
  app.use("/api", apiRouter.router());

  server();

  return app.listen(APP_PORT, () => {
    console.log(`server started on port ${APP_PORT}`);
  });
}