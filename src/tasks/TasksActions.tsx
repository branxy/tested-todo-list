import { getTasksStatistics } from "../lib/functions";

import { useMemo } from "react";

import { type Action, type Tasks } from "./tasksReducer";
import { type Tabs } from "./TaskApp";

import s from "./Tasks.module.css";

interface TasksActionsProps {
  tasks: Tasks;
  dispatch: React.Dispatch<Action>;
  tab: Tabs;
  setTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

function TasksActions({ tasks, dispatch, tab, setTab }: TasksActionsProps) {
  const { completed, uncompleted } = useMemo(
    () => getTasksStatistics(tasks),
    [tasks]
  );

  const itemsLeft =
    uncompleted === 1
      ? `${uncompleted} item left`
      : `${uncompleted} items left`;

  function handleSwitchTabs(currentTab: Tabs, newTab: Tabs) {
    if (currentTab !== newTab) setTab(newTab);
  }

  return (
    <div className={s.tasksActions}>
      <span>{itemsLeft}</span>
      <fieldset className={s.filterTasks}>
        <legend className="screenreader">Filter tasks by status</legend>
        <div className={s.filterBtn}>
          <input
            type="radio"
            name="tasks-status-all"
            id="filter-tasks-all"
            value="all"
            className="screenreader"
            checked={tab === "all"}
            onChange={(e) => handleSwitchTabs(tab, e.target.value as Tabs)}
          />
          <label htmlFor="filter-tasks-all">All</label>
        </div>
        <div className={s.filterBtn}>
          <input
            type="radio"
            name="tasks-status-active"
            id="filter-tasks-active"
            value="active"
            className="screenreader"
            checked={tab === "active"}
            onChange={(e) => handleSwitchTabs(tab, e.target.value as Tabs)}
          />
          <label htmlFor="filter-tasks-active">Active</label>
        </div>
        <div className={s.filterBtn}>
          <input
            type="radio"
            name="tasks-status-completed"
            id="filter-tasks-completed"
            value="completed"
            className="screenreader"
            checked={tab === "completed"}
            onChange={(e) => handleSwitchTabs(tab, e.target.value as Tabs)}
          />
          <label htmlFor="filter-tasks-completed">Completed</label>
        </div>
      </fieldset>
      <button
        className="primary"
        disabled={!completed.length}
        onClick={() =>
          dispatch({ type: "tasks/tasksDeleted", payload: completed })
        }
      >
        Clear completed
      </button>
    </div>
  );
}

export default TasksActions;
