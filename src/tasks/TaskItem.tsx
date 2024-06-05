import type { Task } from "./tasksReducer";
import s from "./Tasks.module.css";

function TaskItem({ task }: { task: Task }) {
  return (
    <li className={s.taskItem}>
      <input
        type="checkbox"
        name="task-status"
        id="task-status"
        defaultChecked={task.done}
      />
      <span>{task.done ? <s>{task.title}</s> : task.title}</span>
    </li>
  );
}

export default TaskItem;
