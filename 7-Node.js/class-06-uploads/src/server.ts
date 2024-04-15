import express from "express";
import { router } from "./routes";
import { appErros } from "./errors/appErrors";
import { pageNotFoundError } from "./errors/pageNotFoundError";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.use(pageNotFoundError);
app.use(appErros);

app.listen(port, () => {
  console.log(`Server is running on PORT: http://localhost:${port}/`);
});
