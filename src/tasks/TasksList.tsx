import TaskInput from "./TaskInput";
import s from "./TasksList.module.css";

function TasksList() {
  return (
    <div className={s.taskslist}>
      <TaskInput />
    </div>
  );
}

export default TasksList;
