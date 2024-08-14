import React, { createContext, useReducer } from "react";
import { usePersistent } from "../hooks/usePersistent";

const initState = {
  allExp: [],
  total: 0,
  activeFilter: "all",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "Add":
      const id = state.allExp.length + 1;
      let newTotal = 0;
      if (action.payload.type == "income") {
        newTotal += parseInt(action.payload.amount);
      } else {
        newTotal -= parseInt(action.payload.amount);
      }
      const newExpense = [...state.allExp, { ...action.payload, id }];
      return {
        ...state,
        allExp: newExpense,
        total: state.total + newTotal,
      };
    case "Delete":
      let updatedTotal = state.total;
      if (action.payload.type == "income") {
        updatedTotal -= parseInt(action.payload.amount);
      } else {
        updatedTotal += parseInt(action.payload.amount);
      }
      return {
        ...state,
        allExp: state.allExp.filter((ele) => ele.id != action.payload.id),
        total: updatedTotal,
      };
    case "Filter":
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      break;
  }
};

export const ExpenseContext = createContext("");

export const ExpenseProvider = ({ children }) => {
  const { state, dispatch } = usePersistent(reducer, initState);
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
