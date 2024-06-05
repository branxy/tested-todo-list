import { useEffect, useReducer } from "react";
import { Action, Tasks, tasksReducer } from "../tasks/tasksReducer";

export function useLocalStorage(
  key: string,
  defaultValue: unknown
): [Tasks, React.Dispatch<Action>] {
  const [tasks, dispatch] = useReducer(tasksReducer, loadTasks(key));

  function loadTasks(key: string) {
    const json = localStorage.getItem(key);

    if (json != null) return JSON.parse(json);
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else return defaultValue;
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [key, tasks]);

  return [tasks, dispatch];
}
