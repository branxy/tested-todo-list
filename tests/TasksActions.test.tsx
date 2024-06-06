import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { describe, expect, it } from "vitest";
import TasksActions from "../src/tasks/TasksActions";
import { Tasks } from "../src/tasks/tasksReducer";
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
  const renderTaskActions = (tasks: Tasks, tab: Tabs) => {
    render(
      <TasksActions
        tasks={tasks}
        dispatch={() => {}}
        tab={tab}
        setTab={() => {}}
      />
    );

    return {
      tasksCount: screen.getAllByText(/left/i),
      filters: {
        all: screen.getAllByText("All"),
        active: screen.getAllByText("Active"),
        completed: screen.getAllByText("Completed"),
      },
      deleteTasksBtn: screen.getAllByText("Clear completed"),
    };
  };

  it("should display a count of uncompleted tasks", () => {
    const tabs: Tabs[] = ["all", "active", "completed"];

    tabs.forEach((tab) => {
      const { tasksCount } = renderTaskActions(exampleTasks, tab);
      expect(tasksCount.length).toBeTruthy();
    });
  });
});
