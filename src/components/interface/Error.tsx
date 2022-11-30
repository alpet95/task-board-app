/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";
import { useAppSelector } from "common/hooks/hooks";

// === ASSETS ------------------------------
import { BiErrorCircle } from "react-icons/bi";

// === STYLES ------------------------------
import classes from "./Error.module.css";

/* =======================================
                  COMPONENT                 
========================================== */

const Error: React.FC = () => {
  // === STATE SELECTOR ----------------------
  const error: string | null = useAppSelector((state) => state.task.error);

  // === LAYOUT ------------------------------
  return (
    <div className={classes.container}>
      <BiErrorCircle className={classes.icon} />
      <p className={classes.error}>{error}</p>
    </div>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Error;
