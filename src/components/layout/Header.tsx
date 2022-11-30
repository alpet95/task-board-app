/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React, { useState, useEffect } from "react";

// === DATA --------------------------------
import { GET_DATE, GET_TIME } from "app/data/date";

// === STYLES ------------------------------
import classes from "./Header.module.css";

/* =======================================
                  COMPONENT                  
========================================== */

const Header: React.FC = () => {
  // === STATE -------------------------------
  const [date, setDate] = useState<Date>(new Date());

  // === VARIABLES ---------------------------
  const dateline: string = GET_DATE(date);
  const timeline: string = GET_TIME(date);

  // === HANDLERS ----------------------------
  function refreshTime() {
    setDate(new Date());
  }

  // === SIDE EFFECTS ------------------------
  useEffect(() => {
    const timerID = setInterval(refreshTime, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  // === LAYOUT ------------------------------
  return (
    <header className={classes.header}>
      <div className={classes.clock}>
        <span className={classes.dateline}>{dateline}</span>
        <span className={classes.timeline}>{timeline}</span>
      </div>
    </header>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Header;
