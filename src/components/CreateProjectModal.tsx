import { Button, Modal, Form } from "react-bootstrap";
import ColorSelection from "./ColorSelection";
import { useState } from "react";
import { projectType } from "../types";
type createProjectModalProps = {
  show: boolean;
  handleClose: () => void;
  handleAdd: (project: projectType) => void;
};
export function CreateProjectModal({
  show,
  handleClose,
  handleAdd,
}: createProjectModalProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  console.log("H", color);
  function handleSubmit() {
    handleAdd({
      title: "",
      color: {
        value: "",
        label: "",
        color: color,
      },
    });
  }
  return (
    <Modal show={show} onHide={handleClose} className="modal create-project">
      <Modal.Header closeButton>
        <Modal.Title> Add Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Your project..." />
          <Form.Label>Color</Form.Label>
          <ColorSelection handleChange={setColor} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
