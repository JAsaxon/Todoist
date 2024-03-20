import { DateCalendar } from "@mui/x-date-pickers";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import "../styles/priorityButton.scss";
type PriorityButtonProps = {
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<number>>;
};
const NUMBER_WORDS = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
};
type priorities = 1 | 2 | 3 | 4;
function PriorityButton({ priority, setPriority }: PriorityButtonProps) {
  return (
    <Dropdown className="priority-dropdown">
      <Dropdown.Toggle id="dropdown-basic" variant="outline-secondary">
        <i
          className={`fa-solid fa-flag ${NUMBER_WORDS[priority as priorities]}`}
        ></i>
        <span>Priority {priority}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="date-menu">
        <Dropdown.Item className="option" onClick={() => setPriority(1)}>
          <i className="fa-solid fa-flag one"></i>
          Priority 1
        </Dropdown.Item>

        <Dropdown.Item className="option" onClick={() => setPriority(2)}>
          <i className="fa-solid fa-flag two"></i>
          Priority 2
        </Dropdown.Item>

        <Dropdown.Item className="option" onClick={() => setPriority(3)}>
          <i className="fa-solid fa-flag three"></i>
          Priority 3
        </Dropdown.Item>

        <Dropdown.Item className="option" onClick={() => setPriority(4)}>
          <i className="fa-regular fa-flag four"></i>
          Priority 4
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PriorityButton;
