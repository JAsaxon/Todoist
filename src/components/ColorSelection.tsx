import { Form } from "react-bootstrap";
import "../styles/colorSelect.scss";
function ColorSelection() {
  return (
    <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">
        <div>One</div>
      </option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

export default ColorSelection;
