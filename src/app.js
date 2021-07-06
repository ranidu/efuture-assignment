import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./router/ApiRouter";
import server from "./db/Connection";

export function startServer() {
  const app = express();
  const APP_PORT = process.env.PORT || 9000;

  //middlware lib to log incoming requests
  let logger = function(req, res, next){
    console.log(`INCOMING REQ: ${req.method} ${req.path}`);
    next();
  }
  //bind request body to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger)
  app.use("/api", apiRouter.router());

  server();

  return app.listen(APP_PORT, () => {
    console.log(`server started on port ${APP_PORT}`);
  });
}