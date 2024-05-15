
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

}

export default new TodoService(TodoModel);