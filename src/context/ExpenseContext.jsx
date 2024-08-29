import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import {
  addExpenditure,
  deleteExpenditure,
  fetchExpenditure,
} from "../APIs/Expense";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";

const initState = {
  allExp: [],
  total: 0,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENDITURES":
      return {
        ...state,
        allExp: action.payload.exp,
        total: action.payload.total,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [activeFilter, setActiveFilter] = useState("all");

  const token = JSON.parse(localStorage.getItem("Token"));
  const { isLoading, error, data } = useSWR(
    [activeFilter, token],
    fetchExpenditure,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        dispatch({
          type: "SET_EXPENDITURES",
          payload: { exp: data.data.exp, total: data.data.total },
        });
      },
      onError: (error) => {
        dispatch({ type: "SET_ERROR", payload: error.message });
      },
    }
  );

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "SET_LOADING" });
    }
  }, [isLoading]);

  const handleAddExpense = async (newExpense) => {
    try {
      await addExpenditure(newExpense);
      mutate(
        [activeFilter, token],
        async (currentData) => {
          return {
            data: {
              exp: [...currentData.data.exp, newExpense],
              total: currentData.data.total + newExpense.amount,
            },
          };
        },
        false
      );
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleFetchExpense = async () => {
    try {
      await mutate([activeFilter, token], fetchExpenditure, true);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleDeleteExpense = async (expenseId, amount) => {
    try {
      await deleteExpenditure(expenseId);
      mutate(
        [activeFilter, token],
        async (currentData) => {
          let deletedData = currentData.data.exp.filter(
            (exp) => exp.expenseid == expenseId
          );
          return {
            data: {
              exp: currentData.data.exp.filter(
                (exp) => exp.expenseid != expenseId
              ),
              total: currentData.data.total + deletedData.amount,
            },
          };
        },
        false
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        state,
        handleAddExpense,
        handleDeleteExpense,
        setActiveFilter,
        activeFilter,
        handleFetchExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
