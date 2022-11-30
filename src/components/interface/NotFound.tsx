/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";

// === ASSETS ------------------------------
import { HiMagnifyingGlass } from "react-icons/hi2";

// === STYLES ------------------------------
import classes from "./NotFound.module.css";

/* =======================================
                  COMPONENT                  
========================================== */

const NotFound: React.FC = () => {
  return (
    <div className={classes.container}>
      <HiMagnifyingGlass className={classes.icon} />
      <p className={classes.message}>You don't have any tasks yet</p>
    </div>
  );
};

/* =======================================
                  EXPORTS
========================================== */

export default NotFound;
