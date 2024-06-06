import { Action } from "./tasksReducer";

import s from "./Tasks.module.css";

function TaskInput({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTaskTitle = form.get("task-title") as string;

    dispatch({ type: "tasks/taskAdded", payload: newTaskTitle });
    e.currentTarget.reset();
  }

  return (
    <form action="" name="create-task-form" onSubmit={handleFormSubmit}>
      <label htmlFor="task-input" className="screenreader">
        New task name:
      </label>
      <input
        type="text"
        name="task-title"
        id="task-input"
        placeholder="New task name"
        minLength={1}
        maxLength={100}
        autoFocus
        required
        className={s.newTaskInput}
      />
    </form>
  );
}

export default TaskInput;
