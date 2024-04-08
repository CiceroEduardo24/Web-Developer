import { sqliteConnection } from "../databases/sqlite3";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export const userRepository = {
  async create({ name, email, password }: CreateUser) {
    const db = await sqliteConnection();
    const userUUID = randomUUID();
    const passwordHash = await hash(password, 10);

    const user = await db.run(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?);",
      [userUUID, name, email, passwordHash]
    );

    return { status: 201, id: userUUID };
  },

  async getbyID(id: string) {
    const db = await sqliteConnection();
    return db.get("SELECT * FROM users WHERE id = ?;", [id]);
  },

  async getbyEmail(email: string) {
    const db = await sqliteConnection();
    return db.get("SELECT * FROM users WHERE email = ?;", [email]);
  },
};
