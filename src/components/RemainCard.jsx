import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import moment from "moment";
//   isShowTime,  length, index are three props that i passed in before. I no longer need them
import { useBudgets } from "../context/BudgetContext"; // Import the useBudgets hook

export default function RemainCard({
  name,
  amount,
  _date,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  onEditClick,
  hideEditButton, // Accept the hideEditButton prop
  editDate,
}) {
  const classNames = [];
  if (amount < max) {
    classNames.push( "bg-opacity-10", "text-primary");
  } else if (gray) {
    classNames.push("bg-light", "text-primary");
  }
  console.log("Received date prop:", _date);

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio > 0.5) return "primary";
    if (ratio > 0.75) return "warning";
    return "danger";
  }

  function handleEditClick() {
    // Call onEditClick and pass editDate
    onEditClick(editDate);
  }

  function handleAddExpenseClick() {
    const currentDate = new Date(); // Get the current date and time
    onAddExpenseClick(currentDate); // Pass the current date and time to the callback
  }

  const { editBudget } = useBudgets();
  // Use the useBudgets hook
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body className="col-12" style={{ width: "100%" }}>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2 text-primary">{name}</div>
          {/* Conditionally render the "Edit" button based on hideEditButton prop */}
          {!hideEditButton && (
            <Button variant="info" onClick={handleEditClick}>
              Sửa
            </Button>
          )}
        </Card.Title>
        <div className="d-flex justify-content-center text-primary mb-2">
          {currencyFormatter.format(amount)}
          {max && (
            <span className="text-primary fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          )}
        </div>
        {/* Display edit date */}
        {editDate && (
          <div className="edit-view mb-2 text-primary">
            Đã sửa lúc: {moment(editDate).format("DD/MM/YYYY h:mm:ss")}
          </div>
        )}
        {/* Display edit date */}
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={handleAddExpenseClick}
            >
              Thêm chi tiêu
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-info">
              Xem chi tiêu
            </Button>
          </Stack>
        )}

        {_date && (
          <div className="time-view text-primary">
            Thêm ngân sách lúc: {moment(_date).format("DD/MM/YYYY h:mm:ss")}
          </div>
        )}
        {/* Display the date */}

        {/*  */}
      </Card.Body>
    </Card>
  );
}
