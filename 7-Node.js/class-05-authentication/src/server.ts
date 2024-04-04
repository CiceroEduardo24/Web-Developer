import express from "express";
import "dotenv/config";
import { routers } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(routers);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}/`);
});
