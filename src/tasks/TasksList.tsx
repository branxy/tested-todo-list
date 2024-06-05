import TaskInput from "./TaskInput";
import s from "./TasksList.module.css";
import { useLocalStorage } from "../lib/hooks";

function TasksList() {
  const [tasks, dispatch] = useLocalStorage("tasks", []);
  console.log({ tasks, dispatch });

  return (
    <div className={s.taskslist}>
      <TaskInput dispatch={dispatch} />
    </div>
  );
}

export default TasksList;
