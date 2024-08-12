import TasksActions from "../tasks/TasksActions";
import { Action, Tasks } from "../tasks/tasksReducer";
import { Tabs } from "../tasks/TaskApp";

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const exampleTasks: Tasks = [
  {
    id: "1",
    title: "task 1",
    done: false,
  },
  {
    id: "2",
    title: "task 2",
    done: true,
  },
];

const dispatch = vi.fn() as React.Dispatch<Action>;
const setTab = vi.fn() as React.Dispatch<React.SetStateAction<Tabs>>;

const renderTaskActions = (tasks: Tasks, tab: Tabs) => {
  render(
    <TasksActions tasks={tasks} dispatch={dispatch} tab={tab} setTab={setTab} />
  );

  return {
    tasksCount: screen.getByText(/left/i),
    filters: {
      all: screen.getByRole("radio", { name: /all/i }),
      active: screen.getByRole("radio", { name: /active/i }),
      completed: screen.getByRole("radio", { name: /completed/i }),
    },
    deleteTasksBtn: screen.getByText("Clear completed"),
  };
};

describe("Tasks left widget", () => {
  it(`All tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "all");

    expect(tasksCount).toBeInTheDocument();
    expect(tasksCount).toHaveTextContent("1 item left");
  });

  it(`Active tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "active");

    expect(tasksCount).toBeInTheDocument();
    expect(tasksCount).toHaveTextContent("1 item left");
  });

  it(`Completed tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "all");

    expect(tasksCount).toBeInTheDocument();
    expect(tasksCount).toHaveTextContent("1 item left");
  });
});

describe("Tabs", () => {
  it(`All tasks tab: click on "Active" tab calls setTab with the right value`, async () => {
    const user = userEvent.setup();
    const {
      filters: { active },
    } = renderTaskActions(exampleTasks, "all");
    await user.click(active);

    expect(setTab).toBeCalledWith("active");
  });

  it(`Active tasks tab: click on "Completed" tab calls setTab with the right value`, async () => {
    const user = userEvent.setup();
    const {
      filters: { completed },
    } = renderTaskActions(exampleTasks, "all");

    await user.click(completed);
    expect(setTab).toBeCalledWith("active");
  });

  it(`Completed tasks tab: click on "All" tab calls setTab with the right value`, async () => {
    const user = userEvent.setup();
    const {
      filters: { all },
    } = renderTaskActions(exampleTasks, "all");

    await user.click(all);
    expect(setTab).toBeCalledWith("active");
  });

  it(`Clear tasks btn: should call "dispatch" with the right action`, async () => {
    const user = userEvent.setup();
    const { deleteTasksBtn } = renderTaskActions(exampleTasks, "all");

    const doneTasksIds = exampleTasks.filter((t) => t.done).map((t) => t.id);

    await user.click(deleteTasksBtn);
    expect(dispatch).toBeCalledWith({
      type: "tasks/tasksDeleted",
      payload: doneTasksIds,
    });
  });
});
