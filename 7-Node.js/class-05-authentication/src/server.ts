import express from "express";
import "dotenv/config";
import { routers } from "./routes";
import { appErrors } from "./errors/appErrors";
import { pageNotFound } from "./errors/pageNotFound";
import { sqliteConnection } from "./databases/sqlite3";
import { runMigrations } from "./databases/sqlite3/migrations";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routers);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}/`);
});

sqliteConnection()
  .then(() => console.log("Database is connected..."))
  .catch((error) => console.error("Database isn't connected -", error));

runMigrations();
