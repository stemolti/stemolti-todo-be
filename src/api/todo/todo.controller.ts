import { NextFunction, Response } from "express";
import todoService from './todo.service';
import { TypedRequest } from "../../utils/typed-requests";
import { TodoQueryDTO } from "./todo.dto";

export const list = async (req: TypedRequest<unknown, TodoQueryDTO>, res: Response, next: NextFunction) => {
  try {    
    const results = await todoService.find(req.query);
    res.json(results);
  } catch(err) {
    next(err);
  }
}