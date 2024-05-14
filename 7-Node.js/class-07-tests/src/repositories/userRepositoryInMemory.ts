import { DataUser } from "../services/userServices";

export const userRepositoryInMemory = {
  async create(data: DataUser) {
    try {
      const { id, name, email } = data;
      const user = {
        id,
        name,
        email,
      };
      const users = [];
      users.push(user);

      return users[users.length - 1];
    } catch (error) {
      console.log(error);
    }
  },
};
