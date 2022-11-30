/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React, { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../common/hooks/hooks";

// === ACTIONS -----------------------------
import { taskActions } from "../store/taskSlice";

// === TYPES -------------------------------
import { Task } from "app/models/task.model";

// === DATA --------------------------------
import { DOMAIN } from "../../../app/data/firebase";

// === ASSETS ------------------------------
import plus from "../../../assets/icons/plus.png";

// === STYLES ------------------------------
import classes from "./TaskInput.module.css";

/* =======================================
                HTTP REQUESTS                
========================================== */

// === POST: ADD ---------------------------
const addTaskToServer = async (task: Task) => {
  const response = await fetch(`${DOMAIN}/tasks/${task.id}.json`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to add ${data.name} task.`);
  }

  return null;
};

/* =======================================
                  COMPONENT                 
========================================== */

const TaskInput: React.FC = () => {
  // === STATE SELECTOR ----------------------
  const taskInputValue = useAppSelector((state) => state.task.taskInputValue);

  // === ACTION DISPATCHER -------------------
  const dispatch = useAppDispatch();

  // === REFS --------------------------------
  const taskInputRef = useRef<HTMLInputElement>(null);

  // === HANDLERS ----------------------------
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstChar = e.target.value.charAt(0).toUpperCase();
    const remainingChars = e.target.value.slice(1);
    const inputValue = firstChar + remainingChars;
    dispatch(taskActions.setTaskInputValue(inputValue));
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskInputValue) {
      const task: Task = {
        id: Date.now(),
        fbKey: "",
        text: taskInputValue,
        isDone: false,
      };

      addTaskToServer(task);
      dispatch(taskActions.addTaskToBundle(task));
      dispatch(taskActions.setAddedTask());
      dispatch(taskActions.resetTaskInputValue());
    }
  };

  // === LAYOUT ------------------------------
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <input
        className={classes.input}
        type="text"
        name="task"
        placeholder="What are you up to?"
        autoComplete="off"
        value={taskInputValue}
        ref={taskInputRef}
        onChange={inputChangeHandler}
      />
      <button type="submit" className={classes.button}>
        <img src={plus} alt="plus" className={classes.plus} />
      </button>
    </form>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default TaskInput;
