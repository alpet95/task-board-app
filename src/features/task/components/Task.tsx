/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../common/hooks/hooks";

// === ACTIONS -----------------------------
import { taskActions } from "../store/taskSlice";

// === TYPES -------------------------------
import { Task as TaskType } from "../../../app/models/task.model";

// === DATA --------------------------------
import { DOMAIN } from "app/data/firebase";

// === COMPONENTS --------------------------
import TaskText from "./TastText";

// === ASSETS ------------------------------
import { MdEdit, MdDone, MdDelete } from "react-icons/md";

// === STYLES ------------------------------
import classes from "./Task.module.css";

/* =======================================
                 PROPS TYPES                 
========================================== */

type Props = {
  task: TaskType;
};

/* =======================================
                HTTP REQUESTS                
========================================== */

// === PUT: EDIT ---------------------------
const addEditedTaskToServer = async (
  taskKey: string,
  fbKey: string,
  task: TaskType,
  editedTaskInputValue: string
) => {
  const editedTask = {
    [fbKey]: {
      id: task.id,
      fbKey: task.fbKey,
      text: editedTaskInputValue,
      isDone: task.isDone,
    },
  };
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(editedTask),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${DOMAIN}/tasks/${taskKey}.json`,
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to edit ${data.name} task.`);
  }

  return null;
};

// === PUT: COMPLETE -----------------------
const completeTaskInServer = async (
  taskKey: string,
  fbKey: string,
  task: TaskType
) => {
  const completedTask = {
    [fbKey]: {
      id: task.id,
      fbKey: task.fbKey,
      text: task.text,
      isDone: !task.isDone,
    },
  };
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(completedTask),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${DOMAIN}/tasks/${taskKey}.json`,
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to complete ${data.name} task.`);
  }

  return null;
};

// === DELETE ------------------------------
const removeTaskFromServer = async (taskKey: string) => {
  const response = await fetch(`${DOMAIN}/tasks/${taskKey}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to remove ${data.name} task.`);
  }

  return null;
};

/* =======================================
                  COMPONENT                  
========================================== */

const Task: React.FC<Props> = (props) => {
  // === PROPS -------------------------------
  const { task } = props;

  // === STATE -------------------------------
  const [readMore, setReadMore] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  // === STATE SELECTOR ----------------------
  const editedTaskInputValue = useAppSelector(
    (state) => state.task.editedTaskInputValue
  );
  const taskAdded = useAppSelector((state) => state.task.taskAdded);

  // === ACTION DISPATCHER -------------------
  const dispatch = useAppDispatch();

  // === REFS --------------------------------
  const inputRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLLIElement>(null);
  const scrollListOnMount = useRef<boolean>(false);

  // === HANDLERS: TASK ----------------------
  const editTaskHandler = () => {
    if (!edit && !task.isDone) {
      setEdit(!edit);
      dispatch(taskActions.getTaskInputValue(task.id));
    }
  };

  const completeTaskHandler = () => {
    const taskKey = task.id.toString();
    const fbKey = task.fbKey !== undefined ? task.fbKey[0] : "";
    completeTaskInServer(taskKey, fbKey, task);
    dispatch(taskActions.completeTaskInBundle(task.id));
  };

  const removeTaskHandler = () => {
    const taskKey = task.id.toString();
    removeTaskFromServer(taskKey);
    dispatch(taskActions.removeTaskFromBundle(task.id));
  };

  const readMoreHandler = () => {
    setReadMore(!readMore);
  };

  // === HANDLERS: EDITED TASK ---------------
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstChar = e.target.value.charAt(0).toUpperCase();
    const remainingChars = e.target.value.slice(1);
    const inputValue = firstChar + remainingChars;
    dispatch(taskActions.setEditedTaskInputValue(inputValue));
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (editedTaskInputValue) {
      const taskKey = task.id.toString();
      const fbKey = task.fbKey !== undefined ? task.fbKey[0] : "";
      addEditedTaskToServer(taskKey, fbKey, task, editedTaskInputValue);
      dispatch(
        taskActions.addEditedTaskToBundle({
          id: task.id,
          editValue: editedTaskInputValue,
        })
      );
    }

    dispatch(taskActions.resetEditedTaskInputValue());
    setEdit(false);
  };

  const scrollDownTaskList = () => {
    taskRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // === SIDE EFFECTS ------------------------
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  useEffect(() => {
    if (scrollListOnMount.current === true || taskAdded) {
      scrollDownTaskList();
    }
  }, [taskAdded]);

  // === CONDITIONAL RENDERING ---------------
  const EDITED_TASK = (
    <form className={classes.editedTaskForm} onSubmit={formSubmitHandler}>
      <input
        type="text"
        name="editedTask"
        autoComplete="off"
        value={editedTaskInputValue}
        onChange={inputChangeHandler}
        onBlur={formSubmitHandler}
        ref={inputRef}
        className={classes.editedTaskInput}
      />
    </form>
  );

  const TASK_TEXT = edit ? (
    EDITED_TASK
  ) : (
    <TaskText
      task={task}
      readMore={readMore}
      readMoreHandler={readMoreHandler}
    />
  );

  // === CONDITIONAL CLASSES -----------------
  const EDIT_CLASSES = `${classes.control} ${classes.edit} ${
    task.isDone ? classes.editDisabled : null
  }`;
  const COMPLETE_CLASSES = `${classes.control} ${
    task.isDone ? classes.completed : classes.complete
  }`;
  const REMOVE_CLASSES = `${classes.control} ${classes.remove}`;

  // === LAYOUT ------------------------------
  return (
    <li className={classes.task} ref={taskRef}>
      {TASK_TEXT}
      <div className={classes.controls}>
        <div className={EDIT_CLASSES} onClick={editTaskHandler}>
          <MdEdit />
        </div>
        <div className={COMPLETE_CLASSES} onClick={completeTaskHandler}>
          <MdDone />
        </div>
        <div className={REMOVE_CLASSES} onClick={removeTaskHandler}>
          <MdDelete />
        </div>
      </div>
    </li>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Task;
