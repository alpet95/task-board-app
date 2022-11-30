/* =======================================
                  IMPORTS                    
========================================== */

// === TYPES -------------------------------
import { TaskBundleInitialState } from "app/models/task.model";

/* =======================================
                    STATE                    
========================================== */

export const taskState: TaskBundleInitialState = {
  taskInputValue: "",
  taskBundle: [],
  editedTaskInputValue: "",
  taskAdded: false,
  status: "pending",
  error: null,
};
