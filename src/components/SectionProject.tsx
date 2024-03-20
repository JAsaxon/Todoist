import { useParams } from "react-router-dom";
import Section from "./Section";
import moment from "moment";

export default function SectionProject() {
  const { id } = useParams();
  const verifiedId = id ?? "x";
  return (
    <Section
      title={verifiedId}
      section_id={verifiedId}
      dueDate={moment().endOf("day").valueOf()}
      isProject={true}
    />
  );
}
