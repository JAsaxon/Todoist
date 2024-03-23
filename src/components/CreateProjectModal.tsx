import { Button, Modal, Form } from "react-bootstrap";
import ColorSelection from "./ColorSelection";
import { useRef, useState } from "react";
import { projectType } from "../types";
import { colourOptions } from "../data/colorData";
type createProjectModalProps = {
  show: boolean;
  handleClose: () => void;
  handleAdd: (project: projectType) => void;
  projects: projectType[];
};
export function CreateProjectModal({
  show,
  handleClose,
  handleAdd,
  projects,
}: createProjectModalProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [color, setColor] = useState(colourOptions[2]);
  console.log("H", color);

  function handleSubmit() {
    const alreadyExists = projects.some(
      (el) => el.title === titleRef.current!.value
    );
    if (!alreadyExists) {
      handleAdd({
        title: titleRef.current!.value,
        color: {
          value: "",
          label: "",
          color: color.color,
        },
      });
      setColor(colourOptions[2]);

      handleClose();
    }
  }
  console.log(color);
  return (
    <Modal show={show} className="modal create-project">
      <Modal.Header closeButton>
        <Modal.Title> Add Project</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your project..."
            required
            ref={titleRef}
          />
          <Form.Label>Color</Form.Label>
          <ColorSelection handleChange={setColor} color={color} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
