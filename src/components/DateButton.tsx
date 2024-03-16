import React, { useState } from "react";
import "../styles/dateButton.scss";
import moment, { Moment } from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import { DateCalendar } from "@mui/x-date-pickers";
import { StringToKebabCase } from "@ilihub/string-to-kebab-case";

type dateButtonProps = {
  title: string;
};
function DateButton({ title }: dateButtonProps) {
  const currentClass = StringToKebabCase(title.toLowerCase());
  const [Calendar, setCalendar] = useState<Moment | null>(moment());
  console.log("date", Calendar?.isSame(moment()));
  return (
    <Dropdown autoClose={false} className="date-dropdown">
      <Dropdown.Toggle as="button" className={`date-button ${currentClass}`}>
        <i className="fa-regular fa-calendar icon"></i>
        {title}
        <i className="fa-solid fa-x"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="date-menu">
        <Dropdown.Item className="option">
          <i className="fa-regular fa-calendar icon"></i>Today
        </Dropdown.Item>
        <Dropdown.Item className="option">
          <i className="fa-regular fa-sun icon"></i>Tommorow
        </Dropdown.Item>
        <Dropdown.Item className="option">
          <i className="fa-solid fa-couch icon"></i>Next Weekend
        </Dropdown.Item>
        <Dropdown.Item className="option">
          <i className="fa-solid fa-arrow-right icon"></i>Next Week
        </Dropdown.Item>
        <DateCalendar
          value={Calendar}
          onChange={(newValue) => setCalendar(newValue)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DateButton;
