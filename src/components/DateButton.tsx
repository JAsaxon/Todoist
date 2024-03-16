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
  type presets = "Today" | "Tomorrow" | "Next Weekend" | "Next Week";
  type stateEvent =
    | "Today"
    | "Tomorrow"
    | "Next Weekend"
    | "Next Week"
    | Moment;
  function stateManager(input: stateEvent) {
    // if input is a moment
    if (typeof input === "string") {
      switch (input) {
        case "Today":
          setCalendar(moment());
          break;
        case "Next Week":
          setCalendar(moment().day(8));

          break;
        case "Next Weekend":
          setCalendar(moment().day(7));
          break;
        case "Tomorrow":
          setCalendar(moment().add(1, "d"));
          break;
      }
      return;
    }
    if (moment.isMoment(input)) {
      setCalendar(input);
    }
    console.error("NOT A VALID INPUT");
  }
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
