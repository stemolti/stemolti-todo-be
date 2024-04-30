import { faker } from '@faker-js/faker';
import { writeFileSync } from 'node:fs';

function generateRandomTodo(){
  return {
    id: faker.database.mongodbObjectId(),
    title:faker.lorem.words({ min: 1, max: 3 }),
    dueDate:faker.date.between({ from: '2024-04-26T00:00:00.000Z', to: '2024-05-10T00:00:00.000Z' }), // '2026-05-16T02:22:53.002Z'
    completed: faker.datatype.boolean()
  }
}
  function generateTodos(num: number){
    const data = Array.from({length: num},() => generateRandomTodo());
    writeFileSync('./todos.json', JSON.stringify(data), {encoding: 'utf-8'});
  }

generateTodos(10);

//expired -> virtual