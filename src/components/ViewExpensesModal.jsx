import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";
import moment from "moment"; // Import moment for date formatting

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const {
    getBudgetExpenses,
    budgets,
    deleteBudget,
    deleteExpense,
  } = useBudgets();

  const expenses = getBudgetExpenses(budgetId).map((expense) => ({
    ...expense,
    expenseDate: moment(expense.expenseDate).format("DD/MM/YYYY HH:mm:ss"), // Format expenseDate
  }));

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Khoản chi - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Xóa
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <div key={expense.id}>
              <div className="d-flex align-items-center mb-2">
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5 mx-2">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </div>
              {/* Separate div for "Edit Time" */}
              <div className="text-muted mb-2">
                Đã thêm lúc: {expense.expenseDate}
              </div>
            </div>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
