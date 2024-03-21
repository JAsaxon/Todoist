import { Button, Modal, Form } from "react-bootstrap";
import ColorSelection from "./ColorSelection";
import { createProjectModalProps } from "./Navbar";
import { useState } from "react";

export function CreateProjectModal({
  show,
  handleClose,
}: createProjectModalProps) {
  const [color, setColor] = useState("");
  console.log("H", color);
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
