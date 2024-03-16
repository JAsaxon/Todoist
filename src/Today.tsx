import "./styles/App.scss";

import Section from "./components/Section.tsx";
import moment from "moment";
export default function Today() {
  const todayAsNumber: number = moment().unix();
  return <Section title="Today" section_id="Today" dueDate={todayAsNumber} />;
}
