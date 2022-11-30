/* =======================================
                  IMPORTS                    
========================================== */

// === REDUX & HOOKS -----------------------
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "app/store";

/* =======================================
                  EXPORTS                    
========================================== */

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
