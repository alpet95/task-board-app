/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React, { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../common/hooks/hooks";

// === COMPONENTS --------------------------
import Task from "./Task";
import NotFound from "components/interface/NotFound";
import Loading from "common/shared/Loading";
import ErrorBoundary from "components/interface/Error";

// === ACTIONS -----------------------------
import { taskActions } from "../store/taskSlice";

// === TYPES -------------------------------
import { Task as TaskType } from "app/models/task.model";

// === DATA --------------------------------
import { DOMAIN } from "../../../app/data/firebase";

// === STYLES ------------------------------
import classes from "./TaskList.module.css";

/* =======================================
                HTTP REQUESTS                
========================================== */

// === GET TASKS ---------------------------
const getTasksFromServer = async () => {
  const response = await fetch(`${DOMAIN}/tasks.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const loadedTasks: TaskType[] = [];
  for (const taskKey in data) {
    for (const firebaseKey in data[taskKey]) {
      const taskData: TaskType = {
        id: data[taskKey][firebaseKey].id,
        fbKey: Object.keys(data[taskKey]).join(""),
        text: data[taskKey][firebaseKey].text,
        isDone: data[taskKey][firebaseKey].isDone,
      };
      loadedTasks.push(taskData);
    }
  }

  return loadedTasks;
};

/* =======================================
                  COMPONENT                 
========================================== */

const TaskList: React.FC = () => {
  // === STATE SELECTOR ----------------------
  const taskBundle = useAppSelector((state) => state.task.taskBundle);
  const status = useAppSelector((state) => state.task.status);
  const error = useAppSelector((state) => state.task.error);

  // === ACTION DISPATCHER -------------------
  const dispatch = useAppDispatch();

  // === SIDE EFFECTS ------------------------
  const sendRequest = useCallback(async () => {
    dispatch(taskActions.setStatus("pending"));
    try {
      const responseData = await getTasksFromServer();
      dispatch(taskActions.setTasksInBundle(responseData));
      dispatch(taskActions.setStatus("completed"));
    } catch (error: any) {
      dispatch(taskActions.setStatus("completed"));
      dispatch(taskActions.setError("Failed to load tasks from the server"));
    }
  }, [dispatch]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // === CONDITIONAL RENDERING ---------------
  const TASK_LIST = (
    <ul className={classes.container}>
      {taskBundle.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );

  let TASK_LIST_CONTENT =
    status === "pending" ? (
      <Loading />
    ) : status === "completed" && error ? (
      <ErrorBoundary />
    ) : status === "completed" && taskBundle.length > 0 ? (
      TASK_LIST
    ) : (
      <NotFound />
    );

  // === LAYOUT ------------------------------
  return TASK_LIST_CONTENT;
};

/* =======================================
                  EXPORTS                    
========================================== */

export default TaskList;
