import moment from "moment";
import Section from "./components/Section";

export default function Eventually() {
  const Oneyearfromnow: number = moment().add(1, "year").unix();

  return (
    <Section
      title="Eventually"
      section_id="Eventually"
      dueDate={Oneyearfromnow}
    />
  );
}
