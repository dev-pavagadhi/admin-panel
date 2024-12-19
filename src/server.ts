import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import adminRoutes from "./routes/adminRoutes";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/admin", adminRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});
