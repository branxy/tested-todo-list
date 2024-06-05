import s from "./Tasks.module.css";
import { Action } from "./tasksReducer";

function TaskInput({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTaskTitle = form.get("task-title") as string;

    dispatch({ type: "tasks/taskAdded", payload: newTaskTitle });
    e.currentTarget.reset();
  }

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <label htmlFor="task-input" className={s.screenreader}>
        New task name:
      </label>
      <input
        type="text"
        name="task-title"
        id="task-input"
        placeholder="New task name"
        autoFocus
        className={s.newTaskInput}
      />
    </form>
  );
}

export default TaskInput;
