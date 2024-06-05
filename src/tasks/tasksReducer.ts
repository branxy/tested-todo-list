import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export type Tasks = Task[];

export type Action =
  | {
      type: "tasks/taskAdded";
      payload: string;
    }
  | {
      type: "tasks/taskStatusChanged";
      payload: string;
    }
  | {
      type: "tasks/tasksDeleted";
      payload: string[];
    };

export function tasksReducer(tasks: Tasks, action: Action): Tasks {
  switch (action.type) {
    case "tasks/taskAdded": {
      const newTask: Task = {
        id: uuidv4(),
        title: action.payload,
        done: false,
      };

      return [...tasks, newTask];
    }
    case "tasks/taskStatusChanged": {
      const updatedTasks = tasks.map((t) => {
        if (t.id === action.payload) {
          return { ...t, done: !t.done };
        } else return t;
      });

      return updatedTasks;
    }
    case "tasks/tasksDeleted": {
      const idsToDelete = action.payload;
      const updatedTasks = tasks.filter((t) => !idsToDelete.includes(t.id));
      return updatedTasks;
    }

    default:
      throw new Error("Unknown action type");
  }
}
