/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";

// === TYPES -------------------------------
import { Task } from "../../../app/models/task.model";

// === COMPONENTS --------------------------
import Button from "common/shared/Button";

// === STYLES ------------------------------
import classes from "./TaskText.module.css";

/* =======================================
                 PROPS TYPES                 
========================================== */

type Props = {
  task: Task;
  readMore: boolean;
  readMoreHandler: () => void;
};

/* =======================================
                  COMPONENT                  
========================================== */

const TastText: React.FC<Props> = ({ task, readMore, readMoreHandler }) => {
  return (
    <div className={classes.textContainer}>
      {task.isDone ? (
        <s className={`${classes.taskText} ${classes.completedTaskText}`}>
          {readMore
            ? task.text
            : task.text.length > 30
            ? `${task.text.slice(0, 30).trim()}...`
            : task.text}
        </s>
      ) : (
        <p className={classes.taskText}>
          {readMore
            ? task.text
            : task.text.length > 30
            ? `${task.text.slice(0, 30).trim()}...`
            : task.text}
        </p>
      )}
      {task.text.length > 30 ? (
        <Button
          className={`${readMore ? classes.hideTextButton : null}`}
          onClick={() => readMoreHandler()}
        >
          {readMore ? "Hide" : "More"}
        </Button>
      ) : null}
    </div>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default TastText;
