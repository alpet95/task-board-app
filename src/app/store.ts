/* =======================================
                  IMPORTS                    
========================================== */

// === REDUX & HOOKS -----------------------
import { configureStore } from "@reduxjs/toolkit";

// === REDUCER ---------------------------
import taskReducer from "../features/task/store/taskSlice";

/* =======================================
                    STORE                    
========================================== */

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

/* =======================================
                  EXPORTS                    
========================================== */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
