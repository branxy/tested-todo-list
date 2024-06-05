import TaskInput from "./TaskInput";
import s from "./Tasks.module.css";
import { useLocalStorage } from "../lib/hooks";
import TaskItem from "./TaskItem";
import TasksFooter from "./TasksFooter";
import { useState } from "react";

export type Tabs = "all" | "active" | "completed";

function TaskApp() {
  const [tasks, dispatch] = useLocalStorage("tasks", []);
  const [tab, setTab] = useState<Tabs>("all");
  console.log({ tasks, dispatch });

  const hasTasks = Boolean(tasks.length);

  return (
    <div className={s.taskApp}>
      <TaskInput dispatch={dispatch} />
      <ul className={s.taskslist}>
        {tasks.map((t, i) => (
          <TaskItem key={i} task={t} dispatch={dispatch} />
        ))}
      </ul>
      {hasTasks && (
        <TasksFooter
          tasks={tasks}
          dispatch={dispatch}
          tab={tab}
          setTab={setTab}
        />
      )}
    </div>
  );
}

export default TaskApp;
