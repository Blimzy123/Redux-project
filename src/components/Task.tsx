import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  editTask,
  toggleTask,
  type TaskItem,
} from "../features/tasks/taskSlice";

interface TaskProps {
  task: TaskItem;
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const handleEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) return;

    dispatch(editTask({ id: task.id, description: trimmedDescription }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.isDone ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggleTask(task.id))}
        aria-label={`Mark ${task.description} as ${
          task.isDone ? "not done" : "done"
        }`}
      />

      {isEditing ? (
        <form className="edit-task-form" onSubmit={handleEdit}>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-label="Edit task description"
            autoFocus
          />

          <button type="submit" className="save-button">
            Save
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>

          <button
            type="button"
            className="edit-button"
            onClick={() => {
              setDescription(task.description);
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
}
