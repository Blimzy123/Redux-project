import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/tasks/taskSlice";

export default function AddTask() {
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) return;

    dispatch(addTask(trimmedDescription));
    setDescription("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What do you need to do?"
        aria-label="New task description"
      />

      <button type="submit">+ Add Task</button>
    </form>
  );
}
