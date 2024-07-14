import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

import { Server } from "http";

let server: Server;

async function main() {
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected , shutting down ... ");

  if (server) {
    server.close(() => {
      process.exit();
    });
  }
  process.exit();
});

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected , shutting down...");
  process.exit();
});
