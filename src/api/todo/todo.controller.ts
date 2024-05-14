import { NextFunction, Request, Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoQueryDTO } from './todo.dto';
import { TodoModel } from './todo.model';
import { NotFoundError } from '../../errors/not-found';

const todoService = new TodoService(TodoModel);

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const includeCompleted = req.query.includeCompleted === 'true';
        const items = await todoService.list(includeCompleted);
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

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoDTO = new TodoQueryDTO();
        todoDTO.title = req.body.title;
        todoDTO.dueDate = req.body.dueDate;
        todoDTO.completed = req.body.completed;

        const newTodo: Todo = await TodoModel.create(todoDTO);

        return res.status(201).json(newTodo);
    } catch (err) {
        next(err)
    }
};

export const markAsChecked = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new NotFoundError();
        }
        const updated = await todoService.markAsChecked(id);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}


export const markAsNotChecked = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new NotFoundError();
        }
        const updated = await todoService.markAsNotChecked(id);
    } catch (err) {
        next(err);
    }
}