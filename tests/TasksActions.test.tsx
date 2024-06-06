import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { describe, expect, it, vi } from "vitest";
import TasksActions from "../src/tasks/TasksActions";
import { Action, Tasks } from "../src/tasks/tasksReducer";
import { Tabs } from "../src/tasks/TaskApp";

describe("Task actions: core functionality", () => {
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
      <TasksActions
        tasks={tasks}
        dispatch={dispatch}
        tab={tab}
        setTab={setTab}
      />
    );

    return {
      tasksCount: screen.getByText(/left/i),
      filters: {
        all: screen.getByText("All"),
        active: screen.getByText("Active"),
        completed: screen.getByText("Completed"),
      },
      deleteTasksBtn: screen.getByText("Clear completed"),
    };
  };

  it(`All tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "all");
    expect(tasksCount).toBeInTheDocument();
  });

  it(`Active tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "active");
    expect(tasksCount).toBeInTheDocument();
  });

  it(`Completed tasks tab: should display a count of uncompleted tasks`, () => {
    const { tasksCount } = renderTaskActions(exampleTasks, "all");
    expect(tasksCount).toBeInTheDocument();
  });

  it(`All tasks tab: click on "Active" tab calls setTab with the right value`, () => {
    const {
      filters: { active },
    } = renderTaskActions(exampleTasks, "all");

    fireEvent.click(active);
    expect(setTab).toBeCalledWith("active");
  });

  it(`Active tasks tab: click on "Completed" tab calls setTab with the right value`, () => {
    const {
      filters: { completed },
    } = renderTaskActions(exampleTasks, "all");

    fireEvent.click(completed);
    expect(setTab).toBeCalledWith("active");
  });

  it(`Completed tasks tab: click on "All" tab calls setTab with the right value`, () => {
    const {
      filters: { all },
    } = renderTaskActions(exampleTasks, "all");

    fireEvent.click(all);
    expect(setTab).toBeCalledWith("active");
  });

  it(`Clear tasks btn: should call "dispatch" with the right action`, () => {
    const { deleteTasksBtn } = renderTaskActions(exampleTasks, "all");

    const doneTasksIds = exampleTasks.filter((t) => t.done).map((t) => t.id);

    fireEvent.click(deleteTasksBtn);
    expect(dispatch).toBeCalledWith({
      type: "tasks/tasksDeleted",
      payload: doneTasksIds,
    });
  });
});
