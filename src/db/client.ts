import {Amplify} from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import type {Schema} from "../../amplify/data/resource";
import {generateClient} from "aws-amplify/data";

Amplify.configure(outputs);

export const client = generateClient<Schema>();

export const fetchTodos = async () => {
  const {data: todos, errors} = await client.models.Todo.list();

  if (errors) {
    // Loggin framework that plays well with Amplify or AWS and Nextjs
    console.error(errors);
    return [];
  }

  console.log({todos});
  return todos;
};

export const createTodo = async () => {
  const {data: todo, errors} = await client.models.Todo.create({
    content: "New Todo",
    isDone: false,
  });

  if (errors) {
    console.error(errors);
    return;
  }

  console.log({todo});
  return todo;
};
