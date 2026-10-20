import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TaskItem {
  id: string;
  description: string;
  isDone: boolean;
}

interface TasksState {
  tasks: TaskItem[];
}

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        description: action.payload,
        isDone: false,
      });
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.isDone = !task.isDone;
      }
    },

    editTask: (
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) => {
      const task = state.tasks.find(
        (item) => item.id === action.payload.id
      );

      if (task) {
        task.description = action.payload.description;
      }
    },
  },
});

export const { addTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
