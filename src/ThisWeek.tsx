import "./styles/App.scss";
import Section from "./components/Section.tsx";
import moment from "moment";
export default function ThisWeek() {
  const thisSundayAsNumber: number = moment().day(7).unix();

  return (
    <Section title="This Week" section_id="WEEK" dueDate={thisSundayAsNumber} />
  );
}
