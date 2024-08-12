import type { Action, Task } from "./tasksReducer";

import s from "./Tasks.module.css";

interface TaskItemProps {
  task: Task;
  dispatch: React.Dispatch<Action>;
}

function TaskItem({ task, dispatch }: TaskItemProps) {
  return (
    <li className={s.taskItem}>
      <input
        type="checkbox"
        name="task-status"
        id="task-status"
        checked={task.done}
        onChange={() =>
          dispatch({ type: "tasks/taskStatusChanged", payload: task.id })
        }
      />
      <label htmlFor="task-status" className="screenreader">
        Task status
      </label>
      <span>{task.done ? <s>{task.title}</s> : task.title}</span>
    </li>
  );
}

export default TaskItem;
