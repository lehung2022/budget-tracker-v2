import { Form, Modal, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
// import DatePicker from "react-datepicker"; 
// Import the DatePicker component
// import "react-datepicker/dist/react-datepicker.css"; 
// Import the styles for DatePicker
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";
import moment from "moment";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
  expenseDate
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  useEffect(() => {
    // Set selectedDate to current date and time when component mounts
    setSelectedDate(new Date());
    // this setSeletctedDate must be passed onto the ViewExpensesModal.jsx
  }, []); // Empty dependency array to run the effect only once

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
      expenseDate: selectedDate, // Include the selected date
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Khoản chi mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Ngân sách</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>
              Đã thêm lúc: {moment(expenseDate).format("DD/MM/YYYY h:mm:ss")}
              {/* This has been fixed */}
            </Form.Label>{" "}
            {/* Update the label to "Time" */}
            <br />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
