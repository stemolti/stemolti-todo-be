
import { NotFoundError } from '../../errors/not-found';
import { Todo } from './todo.entity';
import { TodoModel } from './todo.model';

export class TodoService {
  constructor(private todoModel: typeof TodoModel) { }

  async list(includeCompleted: boolean): Promise<Todo[]> {
      let query: any = {};
      if (!includeCompleted) {
          query.completed = false; 
      }
      return TodoModel.find(query);
  }

  async create(newTodo: Todo): Promise<Todo> {
      const createdTodo = new this.todoModel(newTodo);
      return createdTodo.save();
  }

  async checked(id: string): Promise<Todo | null> {
      const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: true }, { new: true }).exec();
      if (!updatedTodo) {
          throw new NotFoundError();
      }
      return updatedTodo;
  }

  async notChecked(id: string): Promise<Todo | null> {
      const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: false }, { new: true }).exec();
      if (!updatedTodo) {
          throw new NotFoundError();
      }
      return updatedTodo;
  }
}

export default new TodoService(TodoModel);