import { Tabs } from "../tasks/TaskApp";
import { Tasks } from "../tasks/tasksReducer";

export function filterTasks(tasks: Tasks, tab: Tabs) {
  switch (tab) {
    case "all": {
      return tasks;
    }
    case "active": {
      const activeTasks = tasks.filter((t) => !t.done);
      return activeTasks;
    }
    case "completed": {
      const completedTasks = tasks.filter((t) => t.done);
      return completedTasks;
    }
  }
}

interface Statistics {
  completed: string[];
  uncompleted: number;
}

export function getTasksStatistics(tasks: Tasks) {
  const statsBaseObject: Statistics = {
    completed: [],
    uncompleted: 0,
  };

  const count = tasks.reduce((result, t) => {
    if (t.done) {
      result.completed.push(t.id);
    } else {
      result.uncompleted++;
    }

    return result;
  }, statsBaseObject);

  return count;
}
