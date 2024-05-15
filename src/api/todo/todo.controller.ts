import { NextFunction, Request, Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoQueryDTO } from './todo.dto';
import { TodoModel } from './todo.model';
import { NotFoundError } from '../../errors/not-found';

const todoService = new TodoService(TodoModel);

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const completed = req.query.completed === 'true';
        const items = await todoService.list(completed);
        const modifiedItems = items.map(item => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
            dueDate: item.dueDate,
            expired: (item as any).expired
        }));
        res.json(modifiedItems);
    } catch (err) {
        next(err);
    }
}
