/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";

// === COMPONENTS --------------------------
import Main from "./components/layout/Main";

// === STYLES ------------------------------
import classes from "./App.module.css";

/* =======================================
                  COMPONENT                  
========================================== */

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Main />
    </div>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default App;
