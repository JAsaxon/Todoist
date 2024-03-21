import moment from "moment";
import Section from "./components/Section";

export default function Eventually() {
  const maxDate = moment().endOf("year").valueOf();
  const thisSundayAsNumber: number = moment().day(7).unix();

  return (
    <Section
      title="Eventually"
      section_id="Eventually"
      dueDate={thisSundayAsNumber}
    />
  );
}
