import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TaskApp from "../src/tasks/TaskApp";

describe("Creating a new task with TaskInput", () => {
  const renderTaskApp = () => {
    render(<TaskApp />);

    return {
      form: screen.getByRole("form"),
      input: screen.getByPlaceholderText("New task name"),
    };
  };

  it("should render a form for creating a new task", () => {
    const { form, input } = renderTaskApp();

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should add a new task when form is submitted", async () => {
    const { form, input } = renderTaskApp();

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.submit(form);

    const newTask = screen.queryByText("New Task");
    expect(input).toHaveValue("");
    expect(newTask).toBeInTheDocument();
  });
});
