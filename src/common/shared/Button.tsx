/* =======================================
                  IMPORTS                    
========================================== */

// === REACT & HOOKS -----------------------
import React from "react";
// === STYLES ------------------------------
import classes from "./Button.module.css";

/* =======================================
                 PROPS TYPES                 
========================================== */

type Props = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

/* =======================================
                  COMPONENT                 
========================================== */

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={`${classes.readMoreButton} ${props.className}`}
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

/* =======================================
                  EXPORTS                    
========================================== */

export default Button;
