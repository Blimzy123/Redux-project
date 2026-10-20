import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import Task from "./Task";

type TaskFilter = "all" | "done" | "notDone";

export default function ListTask() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState<TaskFilter>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.isDone;
    if (filter === "notDone") return !task.isDone;
    return true;
  });

  const completedCount = tasks.filter((task) => task.isDone).length;

  return (
    <section className="task-list-section">
      <div className="list-heading">
        <div>
          <h2>Your Tasks</h2>
          <p>
            {completedCount} of {tasks.length} completed
          </p>
        </div>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as TaskFilter)
          }
          aria-label="Filter tasks"
        >
          <option value="all">All tasks</option>
          <option value="done">Completed</option>
          <option value="notDone">Pending</option>
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <p>
            {tasks.length === 0
              ? "No tasks yet. Add your first task above!"
              : "No tasks match this filter."}
          </p>
        </div>
      )}
    </section>
  );
}
