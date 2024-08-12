import TaskInput from "../tasks/TaskInput";

import "@testing-library/jest-dom/vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const mockDispatch = vi.fn();

const renderTaskInput = () => {
  render(<TaskInput dispatch={mockDispatch} />);

  return {
    form: screen.getByRole("form"),
    input: screen.getByRole<HTMLInputElement>("textbox", {
      name: /new task name:/i,
    }),
  };
};

export const addTask = async (user: UserEvent, input: HTMLInputElement) => {
  await user.type(input, "Test task", { skipClick: true });
  await user.keyboard("{Enter}");
};

describe("Input init", () => {
  it("should render a with along with a form", () => {
    const { form, input } = renderTaskInput();

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("input should be empty and focused on render", () => {
    const { input } = renderTaskInput();

    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });
});

describe("Input updates", () => {
  it("should display user input", async () => {
    const user = userEvent.setup();
    const { input } = renderTaskInput();

    await user.type(input, "Test task", { skipClick: true });

    expect(input).toHaveValue("Test task");
  });

  it("should be empty and focused after key Enter press", async () => {
    const user = userEvent.setup();
    const { input } = renderTaskInput();

    await addTask(user, input);

    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });
});
