import TaskInput from "../src/tasks/TaskInput";

import { render, screen } from "@testing-library/react";
import {} from "@testing-library/jest-dom/vitest";

describe("TaskInput", () => {
  it("should render a formt for creating a new task", () => {
    render(<TaskInput dispatch={() => {}} />);

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
