export interface Task {
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
          title: action.payload,
          done: false,
        };
        console.log("added new task:", [...tasks, newTask]);
        return [...tasks, newTask];
      }

      break;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
