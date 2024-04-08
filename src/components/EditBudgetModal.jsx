import React, { useState } from "react"; // Import useState from React
import { useBudgets } from "../context/BudgetContext"; // Import useBudgets hook
import { Modal, Form, Button } from "react-bootstrap";

// EditBudgetModal.jsx

export default function EditBudgetModal({ show, handleClose, budget }) {
  const [name, setName] = useState(budget.name);
  const [max, setMax] = useState(budget.max);
  const { editBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    const parsedMax = parseInt(max); // Parse max to an integer
    editBudget({ id: budget.id, name, max: parsedMax }); // Pass parsedMax to editBudget
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Ngân sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="max">
            <Form.Label>Số lượng tối đa</Form.Label>
            <Form.Control
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
