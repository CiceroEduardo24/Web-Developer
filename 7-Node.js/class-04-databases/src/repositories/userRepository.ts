import { sqliteConnection } from "../databases/sqlite3";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

type UserDataCreate = {
  name: string;
  email: string;
  password: string;
};

type UserDataUpdate = {
  id: string;
  name: string;
  email: string;
  newPassword: string;
};

export const userRepository = {
  async create({ name, email, password }: UserDataCreate) {
    const uuid = randomUUID();
    const db = await sqliteConnection();
    const passwordHash = await hash(password, 10);
    await db.run(
      "INSERT INTO users (Id, name, email, password) VALUES (?,?,?,?);",
      [uuid, name, email, passwordHash]
    );

    return { status: 201, id: uuid };
  },

  async getByID(id: string) {
    const db = await sqliteConnection();
    const user = await db.get("SELECT * FROM users WHERE id = ?;", [id]);

    return user;
  },

  async getByEmail(email: string) {
    const db = await sqliteConnection();
    const user = await db.get("SELECT * FROM users WHERE email = ?;", [email]);

    return user;
  },

  async update({ id, name, email, newPassword }: UserDataUpdate) {
    const updateQuery = `
    UPDATE users 
    SET name = ?, email = ?, password = ?, updated_at = DATETIME('now')
    WHERE id = ?;
    `;

    const passwordHash = await hash(newPassword, 10);
    const db = await sqliteConnection();
    await db.run(updateQuery, [name, email, passwordHash, id]);

    return { status: 200, message: "User updated!" };
  },

  async delete(id: string) {
    const db = await sqliteConnection();
    await db.run("DELETE FROM users WHERE id = ?;", [id]);

    return { status: 200, message: "User deleted!" };
  },
};
