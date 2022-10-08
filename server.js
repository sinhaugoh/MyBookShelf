import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
console.log("haha");

import path from "path";
import { fileURLToPath } from "url";
import { router as indexRouter } from "./routes/index.js";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (e) => console.error(e));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
