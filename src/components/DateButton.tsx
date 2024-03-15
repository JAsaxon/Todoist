import React from "react";
import "../styles/dateButton.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import { DateCalendar } from "@mui/x-date-pickers";

function DateButton() {
  const currentClass = "today";
  return (
    <Dropdown autoClose={false}>
      <Dropdown.Toggle as="button" className={`date-button ${currentClass}`}>
        <i className="fa-regular fa-calendar icon"></i>
        Today
        <i className="fa-solid fa-x"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <DateCalendar />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DateButton;
