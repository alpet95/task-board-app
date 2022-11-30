/* =======================================
                  IMPORTS                    
========================================== */

// === REDUX & HOOKS -----------------------
import { PayloadAction } from "@reduxjs/toolkit";

// === TYPES -------------------------------
import {
  Task,
  TaskBundleInitialState,
  EditTaskAction,
} from "app/models/task.model";

/* =======================================
                  REDUCERS                   
========================================== */

// === TASK INPUT --------------------------
export const setTaskInputValue = (
  state: TaskBundleInitialState,
  action: PayloadAction<string>
) => {
  state.taskInputValue = action.payload;
};

export const resetTaskInputValue = (state: TaskBundleInitialState) => {
  state.taskInputValue = "";
};

export const setAddedTask = (state: TaskBundleInitialState) => {
  state.taskAdded = true;
};

// === EDITED TASK INPUT -------------------
export const getTaskInputValue = (
  state: TaskBundleInitialState,
  action: PayloadAction<number>
) => {
  state.editedTaskInputValue = state.taskBundle
    .map((task) => (task.id === action.payload ? task.text : null))
    .join("");
};

export const setEditedTaskInputValue = (
  state: TaskBundleInitialState,
  action: PayloadAction<string>
) => {
  state.editedTaskInputValue = action.payload;
};

export const resetEditedTaskInputValue = (state: TaskBundleInitialState) => {
  state.editedTaskInputValue = "";
};

// === TASK BUNDLE -------------------------
export const setTasksInBundle = (
  state: TaskBundleInitialState,
  action: PayloadAction<Task[]>
) => {
  state.taskBundle = action.payload;
  state.status = "completed";
};

export const addTaskToBundle = (
  state: TaskBundleInitialState,
  action: PayloadAction<Task>
) => {
  state.taskBundle = [...state.taskBundle, action.payload];
  state.status = "completed";
};

export const removeTaskFromBundle = (
  state: TaskBundleInitialState,
  action: PayloadAction<number>
) => {
  state.taskBundle = state.taskBundle.filter(
    (task) => task.id !== action.payload
  );
  state.status = "completed";
};

export const completeTaskInBundle = (
  state: TaskBundleInitialState,
  action: PayloadAction<number>
) => {
  state.taskBundle = state.taskBundle.map((task) =>
    task.id === action.payload ? { ...task, isDone: !task.isDone } : task
  );
  state.status = "completed";
};

export const addEditedTaskToBundle = (
  state: TaskBundleInitialState,
  action: PayloadAction<EditTaskAction>
) => {
  state.taskBundle = state.taskBundle.map((task) =>
    task.id === action.payload.id
      ? { ...task, text: action.payload.editValue }
      : task
  );
  state.status = "completed";
};

// === STATUS ------------------------------
export const setStatus = (
  state: TaskBundleInitialState,
  action: PayloadAction<string>
) => {
  state.status = action.payload;
};

// === ERRORS ------------------------------
export const setError = (
  state: TaskBundleInitialState,
  action: PayloadAction<string | null>
) => {
  state.error = action.payload;
};
