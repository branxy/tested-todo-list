import { useMemo } from "react";
import s from "./Tasks.module.css";
import { Action, Tasks } from "./tasksReducer";
import { Tabs } from "./TaskApp";

interface TasksFooterProps {
  tasks: Tasks;
  dispatch: React.Dispatch<Action>;
  tab: Tabs;
  setTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

interface Statistics {
  completed: string[];
  uncompleted: number;
}

function TasksFooter({ tasks, dispatch, tab, setTab }: TasksFooterProps) {
  const { completed, uncompleted } = useMemo(() => {
    const statsBaseObject: Statistics = {
      completed: [],
      uncompleted: 0,
    };

    const count = tasks.reduce((result, t) => {
      if (t.done) {
        result.completed.push(t.id);
      } else {
        result.uncompleted++;
      }

      return result;
    }, statsBaseObject);

    return count;
  }, [tasks]);

  const itemsLeft =
    uncompleted === 1
      ? `${uncompleted} item left`
      : `${uncompleted} items left`;

  function handleSwitchTabs(currentTab: Tabs, newTab: Tabs) {
    if (currentTab !== newTab) setTab(newTab);
  }

  const allTabStatus = tab === "all" && s.activeTab;
  const activeTabStatus = tab === "active" && s.activeTab;
  const completedTabStatus = tab === "completed" && s.activeTab;

  return (
    <div className={s.tasksFooter}>
      <span>{itemsLeft}</span>
      <div className={s.taskTabs}>
        <button
          disabled={tab === "all"}
          className={`secondary ${allTabStatus}`}
          onClick={() => handleSwitchTabs(tab, "all")}
        >
          All
        </button>
        <button
          disabled={tab === "active"}
          className={`secondary ${activeTabStatus}`}
          onClick={() => handleSwitchTabs(tab, "active")}
        >
          Active
        </button>
        <button
          disabled={tab === "completed"}
          className={`secondary ${completedTabStatus}`}
          onClick={() => handleSwitchTabs(tab, "completed")}
        >
          Completed
        </button>
      </div>
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

export default TasksFooter;
