import "dotenv/config";
import config from "config";
import App from "./app";
import DbConnection from "./database/connection";
import mongoose from "mongoose";
import { createSuperAdmin } from "./database/seeders/admin.seed";
import {setUpRedisClient} from "./redis/redis"
// import { getActiveServiceJob } from "./scheduled-jobs/activeService.job";


const port = config.get("PORT") ?? 5000;

const app = new App();

const startApp = async (app: App, port: number) => {
  await new DbConnection(mongoose, config.get("DB_URI") ?? "").connectToDB();
  await createSuperAdmin();
  await setUpRedisClient()
  await app.start(port);
  // getActiveServiceJob();

};

startApp(app, port as number);
