import React, { useEffect, useState } from "react";
import "../styles/dateButton.scss";
import moment, { Moment } from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import { DateCalendar } from "@mui/x-date-pickers";
import { StringToKebabCase } from "@ilihub/string-to-kebab-case";

const CUSTOM_FORMAT: moment.CalendarSpec = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "[Next Week]",
};
// const defaultsToMoments = {
//   Today: moment(),
//   "This week": moment().day(7),
// };
type dateButtonProps = {
  title: string;
  setDate: React.Dispatch<React.SetStateAction<number>>;
  isProject?: boolean;
};
function DateButton({ title, setDate, isProject }: dateButtonProps) {
  console.log("IS PROJECT:", !!isProject);
  const fallBackDate = isProject ? "Today" : title;
  const currentClass = StringToKebabCase(title.toLowerCase());
  const [Calendar, setCalendar] = useState<Moment | null>(null); // Moment Data
  const [MenuVisible, setMenuVisible] = useState(false); // Actual rendered Date
  const [dateText, setDateText] = useState<string>(fallBackDate);
  // type presets = "Today" | "Tomorrow" | "Next Weekend" | "Next Week";
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
    } else {
      //! Messy solution improve later
      if (title === "Today") {
        setDate(moment().endOf("day").valueOf());
      }
      if (title === "This Week") {
        setDate(moment().day(7).endOf("day").valueOf());
      }
      console.error(title, "ERROR: TITLE IS INVALID DATE");
    }
  }, [Calendar]);

  function stateManager(input: stateEvent) {
    setMenuVisible(false);
    if (typeof input === "string") {
      switch (input) {
        case "Today":
          setCalendar(moment().endOf("day"));
          break;
        case "Next Week":
          setCalendar(moment().day(8).endOf("day"));

          break;
        case "Next Weekend":
          setCalendar(moment().day(7).endOf("day"));
          break;
        case "Tomorrow":
          setCalendar(moment().add(1, "d").endOf("day"));
          break;
      }
      return;
    }
    setMenuVisible(false);
    // if input is a moment

    if (moment.isMoment(input)) {
      setCalendar(input.endOf("day"));
      return;
    }
    console.error("NOT A VALID INPUT");
  }
  console.log(MenuVisible);

  return (
    <Dropdown
      className="date-dropdown"
      autoClose={false}
      show={MenuVisible}
      drop="end"
    >
      <Dropdown.Toggle
        id="dropdown-basic"
        className={`date-button ${currentClass}`}
        onClick={() => setMenuVisible((prev) => !prev)}
      >
        <i className="fa-regular fa-calendar icon"></i>
        {dateText ?? "cheese"}
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
