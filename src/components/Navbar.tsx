import { Link, useLocation } from "react-router-dom";
import { useHover } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCaretDown,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.scss";
import { projectProps } from "../App";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Modal,
  useAccordionButton,
  Form,
} from "react-bootstrap";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import ColorSelection from "./ColorSelection";

export function Navbar() {
  const [createProject, setCreateProject] = useState(false);
  const location = useLocation().pathname;
  return (
    <div className="sidebar">
      <div className="username">
        <span className="profile-picture"></span>jorgesaxon1234
      </div>
      <div className="times">
        <Link to="./">
          <div className={`time ${location === "/" ? "active" : ""}`}>
            <i className="fa-regular fa-calendar"></i> Today
          </div>
        </Link>

        <Link to="./week">
          <div className={`time ${location === "/week" ? "active" : ""}`}>
            <i className="fa-solid fa-calendar-week"></i> Week
          </div>
        </Link>
        <Link to="./eventually">
          <div className={`time ${location === "/eventually" ? "active" : ""}`}>
            <i className="fa-solid fa-book"></i> Eventually
          </div>
        </Link>
      </div>

      <CreateProjectModal
        show={createProject}
        handleClose={() => setCreateProject(false)}
      />
      <Accordion defaultActiveKey="0">
        <Card.Header>
          <ProjectsToggle eventKey="0" setModal={setCreateProject} />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <div className="projects">
            <Project color={1} text="Social" />
            <Project color={2} text="Web development" />
            <Project color={3} text="Work" />
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}

type createProjectModalProps = {
  show: boolean;
  handleClose: () => void;
};
type ProjectsToggle = {
  eventKey: string;
  callback?: (arg: AccordionEventKey) => void;
  setModal: Dispatch<SetStateAction<boolean>>;
};
function ProjectsToggle({ eventKey, callback, setModal }: ProjectsToggle) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const sectionTitle = (hovered: boolean) => (
    <h1 className="section-title">
      <div className="text">My projects</div>
      <span className="icons">
        {hovered && (
          <FontAwesomeIcon
            icon={faAdd}
            className="add"
            onClick={() => setModal(true)}
          />
        )}{" "}
        <FontAwesomeIcon icon={faCaretDown} onClick={decoratedOnClick} />{" "}
      </span>
    </h1>
  );
  const [HoverableSectionTitle] = useHover(sectionTitle);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isCurrentEventKey = activeEventKey === eventKey;

  return <div>{HoverableSectionTitle}</div>;
}
function CreateProjectModal({ show, handleClose }: createProjectModalProps) {
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
          <ColorSelection />
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

function Project({ text, color }: projectProps) {
  const element = (hovered: boolean) => (
    <Link to={`project/${encodeURIComponent(text)}`}>
      <div className={`project color${color}`}>
        <div className="text">{text}</div>
        {hovered && (
          <span className="icon-more">
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
        )}
      </div>
    </Link>
  );
  const [hoverable] = useHover(element);

  return <div>{hoverable}</div>;
}
