import mongoose from "mongoose";
import config from "config";

export default function server() {
  const MONGO_DB_HOST = process.env.MONGOS_HOST || config.get("db");
  mongoose
    .connect(MONGO_DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`connection established to db ${MONGO_DB_HOST}.`))
    .catch((e) =>
      console.error(`error occured when establishing connection to db`, e)
    );
}