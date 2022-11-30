// === SINGLE TASK TYPES -------------------
export interface Task {
  id: number;
  fbKey?: string;
  text: string;
  isDone: boolean;
}

// === TASK STATE TYPE ---------------------
export type TaskBundleInitialState = {
  taskInputValue: string;
  taskBundle: Task[];
  editedTaskInputValue: string;
  taskAdded: boolean;
  status: string;
  error: string | null;
};

// === TASK ACTIONS TYPES ------------------
export type EditTaskAction = {
  id: number;
  editValue: string;
};
