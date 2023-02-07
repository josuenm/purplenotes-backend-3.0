import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import "./config/mongodb";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes/index.routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api", routes);

app.listen(PORT, () => console.log(`🚀 Server is runing on port ${PORT}`));
