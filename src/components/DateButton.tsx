import React from "react";
import "../styles/dateButton.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";

function DateButton() {
  const currentClass = "today";
  return (
    <Dropdown>
      <Dropdown.Toggle as="button" className={`date-button ${currentClass}`}>
        <i className="fa-regular fa-calendar icon"></i>
        Today
        <i className="fa-solid fa-x"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Test</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DateButton;
