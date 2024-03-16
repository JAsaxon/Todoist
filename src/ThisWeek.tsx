import "./styles/App.scss";
import Section from "./components/Section.tsx";
import moment from "moment";
export default function Today() {
  const thisSundayAsNumber: number = moment().day(7).unix();
  console.log(
    "NEXT",
    moment.unix(thisSundayAsNumber).calendar(null, {
      nextWeek: "[Next Week]",
      lastWeek: "[Last Week]",
    })
  );
  return (
    <Section title="This Week" section_id="WEEK" dueDate={thisSundayAsNumber} />
  );
}
