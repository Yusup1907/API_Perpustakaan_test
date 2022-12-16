import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./config/Database.js";
import Anggota from "./Routes/AnggotaRoute.js";
import PerpustakaanController from "./Routes/PerpustakaanRoute.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Anggota);
app.use("/api/v1", PerpustakaanController);

app.use((req, res) => {
  res.status(404).json({ message: "404_NOT_FOUND" });
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

// config
dotenv.config({
  path: "config/.env",
});

// Connect Database
connectDatabase();

// Creat Server
app.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT}`);
});
