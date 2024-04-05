import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z
            .string({
              required_error: "Nome obrigatório!",
              invalid_type_error: "O nome deve ser do typo textual",
            })
            .min(3, { message: "Nome deve ter pelo menos 3 caracteres!" })
            .max(100, { message: "Tamanho máximo atingido por nome!" }),

          email: z
            .string({
              required_error: "Email obrigatório!",
              invalid_type_error: "Para o email use somente texto!",
            })
            .email({ message: "Email inválido!" })
            .max(100, { message: "Tamanho máximo atingido por email!" }),

          password: z
            .string({
              required_error: "Senha obrigatória!",
              invalid_type_error: "Para a senha use o tipo string!",
            })
            .min(7, { message: "Senha com mínimo de 7 caracteres!" })
            .max(100, { message: "Tamanho máximo atingido por senha!" })
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
      console.log(name, email, password);

      return res.status(201).json({ message: "User created!" });
    } catch (error) {
      return next(error);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "User read!" });
    } catch (error) {
      return next(error);
    }
  },
};
