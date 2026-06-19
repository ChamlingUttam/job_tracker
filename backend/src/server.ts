import "dotenv/config"
import express from "express";
import applicationRouter from "./routes/application.route";

const app = express();
const PORT = 5000;

app.use(express.json())

app.use("/api",applicationRouter)

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});