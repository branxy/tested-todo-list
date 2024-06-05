import TaskInput from "./TaskInput";
import s from "./Tasks.module.css";
import { useLocalStorage } from "../lib/hooks";
import TaskItem from "./TaskItem";

function TaskApp() {
  const [tasks, dispatch] = useLocalStorage("tasks", []);
  console.log({ tasks, dispatch });

  return (
    <div>
      <TaskInput dispatch={dispatch} />
      <ul className={s.taskslist}>
        {tasks.map((t, i) => (
          <TaskItem key={i} task={t} />
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
