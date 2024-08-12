import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";

import { renderTaskApp } from "./TaskApp.test";
import userEvent from "@testing-library/user-event";
import { addTask } from "./TaskInput.test";

describe("Task Item component functionality", () => {
  it(`should mark task as "done" when its checkbox is toggled`, async () => {
    const user = userEvent.setup();
    const { input } = renderTaskApp();

    await addTask(user, input);

    const checkbox = screen.getByRole("checkbox", {
      name: /task status/i,
    });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // navigate to "completed" tab
    const completedTasksTab = screen.getByRole("radio", { name: "Completed" });
    await user.click(completedTasksTab);

    const checkedCheckbox = screen.getByRole("checkbox", {
      name: /task status/i,
      checked: true,
    });

    expect(checkedCheckbox).toBeInTheDocument();
  });
});
