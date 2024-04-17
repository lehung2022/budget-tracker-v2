import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudget from "./components/TotalBudget";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import EditBudgetModal from "./components/EditBudgetModal";
import { useScreenBelowBreakpoint } from "./hooks/useScreenBelowBreakpoint";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false); // State for EditBudgetModal
  const [editBudgetId, setEditBudgetId] = useState(); // State for edited budget ID
  const isBelow320px = useScreenBelowBreakpoint(320);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  // Function to open EditBudgetModal
  function openEditBudgetModal(budgetId) {
    setEditBudgetId(budgetId);
    setShowEditBudgetModal(true);
  }

  // Function to close EditBudgetModal
  function closeEditBudgetModal() {
    setShowEditBudgetModal(false);
  }

  console.log("Budgets from context:", budgets);

  let content;
  if (isBelow320px) {
    content = (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>
        <p>Nothing to display</p>
      </div>
    );
  } else {
    content = (
      <>
        <Container className="my-4">
          <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto text-light">Ngân sách</h1>
            <Button
              variant="primary"
              onClick={() => setShowAddBudgetModal(true)}
            >
              Thêm ngân sách
            </Button>
            <Button variant="outline-light" onClick={openAddExpenseModal}>
              Thêm chi tiêu
            </Button>
          </Stack>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  isShowTime={true}
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  _date={budget._date} // Pass the date property to the BudgetCard component
                  editDate={budget.editDate}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)} // Pass the current date when adding expense
                  currentDate={budget.currentDate}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                  onEditClick={() => openEditBudgetModal(budget.id)} // Function to handle edit action
                />
              );
            })}
            <UncategorizedBudgetCard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudget />
          </div>
        </Container>
        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />

        {showEditBudgetModal && ( // Render EditBudgetModal only if showEditBudgetModal is true
          <EditBudgetModal
            show={showEditBudgetModal}
            budget={budgets.find((budget) => budget.id === editBudgetId)}
            handleClose={closeEditBudgetModal}
          />
        )}
      </>
    );
  }

  return content; // Return the content here, outside the block
}

export default App;
