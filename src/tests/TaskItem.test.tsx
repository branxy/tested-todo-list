import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TaskApp from "../tasks/TaskApp";

import { describe, expect, it } from "vitest";

describe("Task Item component functionality", () => {
  const renderTaskApp = () => {
    render(<TaskApp />);

    return {
      form: screen.getByRole("form"),
      input: screen.getByPlaceholderText("New task name"),
    };
  };
  it(`should mark task as "done" when its checkbox is toggled`, () => {
    const { form, input } = renderTaskApp();
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.submit(form);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // navigate to "completed" tab
    const completedTasksTab = screen.getByText("Completed");
    fireEvent.click(completedTasksTab);

    const checkedCheckbox = screen.getByRole("checkbox");
    expect(checkedCheckbox).toBeInTheDocument();
  });
});
