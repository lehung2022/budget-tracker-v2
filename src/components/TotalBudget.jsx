import { useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudget() {
  const { expenses, budgets } = useBudgets();
  const amount = Array.isArray(expenses)
    ? expenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return (
    <BudgetCard
      amount={amount}
      name="Tổng cộng"
      gray
      max={max}
      hideButtons={true}
      hideEditButton={true} // Pass the hideEditButton prop
    />
  );
}
