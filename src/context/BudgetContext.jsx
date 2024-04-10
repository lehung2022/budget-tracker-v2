import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    // Ensure expenses is an array before filtering
    if (!Array.isArray(expenses)) {
      return [];
    }

    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    const expenseDate = new Date();
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    // Add the time and date here
    const _date = new Date();
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max, _date }];
    });
  }

  function editBudget({ id, name, max }) {
    const editDate = new Date();
    setBudgets((prevBudgets) => {
      return prevBudgets.map((budget) => {
        if (budget.id === id) {
          return { ...budget, name, max, editDate };
        }
        return budget;
      });
    });
  }

  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  function addDate({ name, max }) {
    setDate((prevDates) => {
      if (prevDates.find((date) => date.date === date)) {
        return prevDates;
      }
      return [...prevDates, { id: uuidV4(), date }];
    });
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        editBudget,
        addDate,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
