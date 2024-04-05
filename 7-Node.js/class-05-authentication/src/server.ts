import express from "express";
import "dotenv/config";
import { routers } from "./routes";
import { appErrors } from "./errors/appErrors";
import { pageNotFound } from "./errors/pageNotFound";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routers);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}/`);
});
