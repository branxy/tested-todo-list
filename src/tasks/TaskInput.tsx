import s from "./TasksList.module.css";

function TaskInput() {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTaskTitle = form.get("task-title");

    // dispatch
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
