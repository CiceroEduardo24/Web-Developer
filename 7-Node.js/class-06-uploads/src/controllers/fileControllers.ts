import { Request, Response, NextFunction } from "express";

export const fileControllers = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      
      return res.status(200).json({});
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      return res.status(200).json({message: "file deleted!"});
    } catch (error) {
      return next(error);
    }
  },
};
