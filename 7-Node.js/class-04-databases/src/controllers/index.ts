import { userRepository } from "../repositories/userRepository";
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z
            .string({
              required_error: "Nome obrigatório!",
              invalid_type_error: "Para o nome digite somente texto!",
            })
            .min(3, { message: "Mínimo de 3 caracteres!" }),

          email: z
            .string({
              required_error: "Email obrigatório!",
              invalid_type_error: "Para o email use somente texto!",
            })
            .email({ message: "Email inválido!" }),
          password: z
            .string({
              required_error: "Senha obrigatória!",
              invalid_type_error: "Para a senha use o tipo string!",
            })
            .min(7, { message: "Senha com mínimo de 7 caracteres!" })
            .regex(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{7,}$/,
              {
                message:
                  "A senha deve conter pelo menos uma letra maiúscula, um numerico e caractere especial!",
              }
            ),
        })
        .strict();
      const { name, email, password } = userSchema.parse(req.body);

      const userEmail = await userRepository.getByEmail(email);
      if (userEmail) {
        throw res.status(404).json({ message: "Email already exist!" });
      }

      const userCreated = await userRepository.create({
        name,
        email,
        password,
      });
      return res.status(201).json({ message: "created!", ...userCreated });
    } catch (error) {
      next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        throw res
          .status(400)
          .json({ message: "Please, confirm your password!" });
      }

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "User not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(400).json({ message: "Invalid password!" });
      }

      const { name, email } = user;

      return res.json({ name, email });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password, newPassword } = req.body;

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "User not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(401).json({ message: "Invalid password!" });
      }

      const userEmail = await userRepository.getByEmail(email);
      if (userEmail && userEmail.id != id) {
        throw res.status(404).json({ message: "Email already exist!" });
      }

      const userUpdated = await userRepository.update({
        id,
        name,
        email,
        newPassword,
      });
      return res.status(200).json({ userUpdated });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "User not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(401).json({ message: "Invalid password!" });
      }

      const userDeleted = await userRepository.delete(id);
      return res.status(200).json(userDeleted);
    } catch (error) {
      next();
    }
  },
};
