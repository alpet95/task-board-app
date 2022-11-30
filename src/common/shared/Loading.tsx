/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";

// === STYLES ------------------------------
import classes from "./Loading.module.css";

/* =======================================
                  COMPONENT                  
========================================== */

const Loading: React.FC = () => {
  return <div className={classes.spinner}></div>;
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Loading;
