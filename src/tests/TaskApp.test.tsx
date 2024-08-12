import TaskApp from "../tasks/TaskApp";

import "@testing-library/jest-dom/vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const addTask = async (user: UserEvent, input: HTMLInputElement) => {
  await user.type(input, "Test task", { skipClick: true });
  await user.keyboard("{Enter}");
};

describe("TaskInput integration", () => {
  const renderTaskApp = () => {
    render(<TaskApp />);

    return {
      form: screen.getByRole("form"),
      input: screen.getByRole<HTMLInputElement>("textbox", {
        name: /new task name:/i,
      }),
    };
  };

  it("should add a new task with unchecked checkbox to the tasks list on key Enter press", async () => {
    const user = userEvent.setup();

    const { input } = renderTaskApp();

    await addTask(user, input);

    const newTaskTitle = screen.getByText(/test task/i);
    const newTaskCheckbox = screen.getByRole("checkbox", {
      name: /task status/i,
    });

    expect(newTaskCheckbox).toBeInTheDocument();
    expect(newTaskCheckbox).not.toBeChecked();

    expect(newTaskTitle).toBeInTheDocument();
  });
});
