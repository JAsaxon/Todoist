import React, { useEffect, useState } from "react";
import "../styles/dateButton.scss";
import moment, { Moment } from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import { DateCalendar } from "@mui/x-date-pickers";
import { StringToKebabCase } from "@ilihub/string-to-kebab-case";

type dateButtonProps = {
  title: string;
  setDate: React.Dispatch<React.SetStateAction<number>>;
};
const CUSTOM_FORMAT: moment.CalendarSpec = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "[Next Week]",
};
function DateButton({ title, setDate }: dateButtonProps) {
  const currentClass = StringToKebabCase(title.toLowerCase());
  const [Calendar, setCalendar] = useState<Moment | null>(moment()); // Moment Data
  const [MenuVisible, setMenuVisible] = useState(false); // Actual rendered Date
  const [dateText, setDateText] = useState(title);
  type presets = "Today" | "Tomorrow" | "Next Weekend" | "Next Week";
  type stateEvent =
    | "Today"
    | "Tomorrow"
    | "Next Weekend"
    | "Next Week"
    | Moment;

  useEffect(() => {
    if (moment.isMoment(Calendar)) {
      setDateText(Calendar.calendar(null, CUSTOM_FORMAT));
      setDate(Calendar.valueOf());
    }
  }, [Calendar]);

  function stateManager(input: stateEvent) {
    setMenuVisible(false);
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
          console.log("x");
          setCalendar(moment().add(1, "d"));
          break;
      }
      return;
    }
    setMenuVisible(false);
    if (moment.isMoment(input)) {
      setCalendar(input);
      return;
    }
    console.error("NOT A VALID INPUT");
  }
  console.log(MenuVisible);
  return (
    <Dropdown className="date-dropdown" autoClose={false} show={MenuVisible}>
      <Dropdown.Toggle
        id="dropdown-basic"
        className={`date-button ${currentClass}`}
        onClick={() => setMenuVisible((prev) => !prev)}
      >
        <i className="fa-regular fa-calendar icon"></i>
        {dateText}
        <i className="fa-solid fa-x"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="date-menu" show={MenuVisible}>
        <Dropdown.Item className="option" onClick={() => stateManager("Today")}>
          <i className="fa-regular fa-calendar icon"></i>
          Today
        </Dropdown.Item>
        <Dropdown.Item
          className="option"
          onClick={() => stateManager("Tomorrow")}
        >
          <i className="fa-regular fa-sun icon"></i>
          Tommorow
        </Dropdown.Item>

        <Dropdown.Item
          className="option"
          onClick={() => stateManager("Next Weekend")}
        >
          <i className="fa-solid fa-couch icon"></i>
          Next Weekend
        </Dropdown.Item>

        <Dropdown.Item
          className="option"
          onClick={() => stateManager("Next Week")}
        >
          <i className="fa-solid fa-arrow-right icon"></i>
          Next Week
        </Dropdown.Item>
        <DateCalendar
          value={Calendar}
          onChange={(newValue) => stateManager(newValue)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DateButton;
