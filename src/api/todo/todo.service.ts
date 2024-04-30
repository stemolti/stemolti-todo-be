
import { TodoQueryDTO } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoModel } from './todo.model';

export class TodoService {
  async find(query: TodoQueryDTO): Promise<Todo[]> {
    const q: any = {};

    const results = await TodoModel.find(q);
    
    return results;
  }
}

export default new TodoService();