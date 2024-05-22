import { useBudgets } from "../context/BudgetContext";
import RemainCard from "./RemainCard";

export default function TotalBudget() {
  const { expenses, budgets } = useBudgets();
  // Calculate total expenses
  const totalExpenses = Array.isArray(expenses)
    ? expenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;

  // Calculate total budget
  const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);

  // Calculate remaining budget
  const remainingBudget = totalBudget - totalExpenses;

  if (totalBudget === 0) return null;
  return (
    <RemainCard
      amount={remainingBudget}
      name="Còn lại"
      gray
      max={totalBudget}
      hideButtons={true}
      hideEditButton={true} // Pass the hideEditButton prop
    />
  );
}
