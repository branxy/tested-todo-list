import TaskInput from "./TaskInput";
import TasksActions from "./TasksActions";
import TaskItem from "./TaskItem";

import { filterTasks } from "../lib/functions";

import { useLocalStorage } from "../lib/hooks";
import { useMemo, useState } from "react";

import s from "./Tasks.module.css";

export type Tabs = "all" | "active" | "completed";

function TaskApp() {
  const [tasks, dispatch] = useLocalStorage("tasks", []);
  const [tab, setTab] = useState<Tabs>("all");

  const hasTasks = Boolean(tasks.length);

  const filteredTasks = useMemo(() => filterTasks(tasks, tab), [tasks, tab]);

  return (
    <div className={s.taskApp}>
      <TaskInput dispatch={dispatch} />
      {!hasTasks && <p>No tasks yet</p>}
      {hasTasks && (
        <TasksActions
          tasks={filteredTasks}
          dispatch={dispatch}
          tab={tab}
          setTab={setTab}
        />
      )}
      <ul className={s.taskslist}>
        {filteredTasks.map((t, i) => (
          <TaskItem key={i} task={t} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
