/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import { createSlice } from "@reduxjs/toolkit";

// === TASK REDUCERS -----------------------
import {
  setTaskInputValue,
  resetTaskInputValue,
  setAddedTask,
  getTaskInputValue,
  resetEditedTaskInputValue,
  setEditedTaskInputValue,
  setTasksInBundle,
  removeTaskFromBundle,
  addTaskToBundle,
  completeTaskInBundle,
  addEditedTaskToBundle,
  setStatus,
  setError,
} from "./taskReducers";

// === TASK STATE --------------------------
import { taskState } from "./taskState";

/* =======================================
                  TASK SLICE                 
========================================== */
const taskSlice = createSlice({
  name: "task",
  initialState: taskState,
  reducers: {
    setTaskInputValue,
    resetTaskInputValue,
    setAddedTask,
    getTaskInputValue,
    resetEditedTaskInputValue,
    setEditedTaskInputValue,
    removeTaskFromBundle,
    addTaskToBundle,
    setTasksInBundle,
    completeTaskInBundle,
    addEditedTaskToBundle,
    setStatus,
    setError,
  },
});

/* =======================================
                  EXPORTS                    
========================================== */

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;
