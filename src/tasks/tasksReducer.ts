import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export type Tasks = Task[];

export type Action = {
  type: "tasks/taskAdded";
  payload: string;
};

export function tasksReducer(tasks: Tasks, action: Action): Tasks {
  switch (action.type) {
    case "tasks/taskAdded":
      {
        const newTask: Task = {
          id: uuidv4(),
          title: action.payload,
          done: false,
        };

        return [...tasks, newTask];
      }

      break;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
