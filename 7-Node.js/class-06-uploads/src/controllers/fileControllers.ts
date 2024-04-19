import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { UPLOADS_FOLDER } from "../configs/uploadConfig";

export const fileControllers = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        const { filename, size, originalname } = req.file;
        const myFile = {
          name: originalname,
          key: filename,
          size: Number(size / 1024).toFixed(1) + "KB",
          url: `${process.env.SERVER_BASE_URL}/file/${filename}`,
          created_at: new Date(),
        };

        return res.status(200).json({ myFile });
      }
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const filePath = path.resolve(UPLOADS_FOLDER, name);

      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);

      return res.status(200).json({ message: "file deleted!" });
    } catch (error) {
      return next(error);
    }
  },
};
