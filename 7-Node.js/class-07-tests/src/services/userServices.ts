export type DataUser = {
  id: string;
  name: string;
  email: string;
};

type UserRepository = {
  create(data: DataUser): Promise<DataUser | undefined>;
};

export const userServices = {
  async create(data: DataUser, userRepository: UserRepository) {
    try {
      const { id, name, email } = data;

      const user = {
        id,
        name,
        email,
      };

      const userCreated = await userRepository.create(user);

      return userCreated;
    } catch (error) {
      console.log(error);
    }
  },
};
