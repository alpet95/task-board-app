/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";

// === COMPONENTS --------------------------
import Header from "./Header";
import TaskInput from "features/task/components/TaskInput";
import TaskList from "features/task/components/TaskList";

// === STYLES ------------------------------
import classes from "./Main.module.css";

/* =======================================
                  COMPONENT                  
========================================== */

const Main: React.FC = () => {
  return (
    <div className={classes.main}>
      <Header />
      <TaskInput />
      <TaskList />
    </div>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Main;
