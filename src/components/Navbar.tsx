import { Link } from "react-router-dom";
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
} from "react-bootstrap";
import { useContext, useState } from "react";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";
type contextAwareToggleProps = {
  children: React.ReactNode;
  eventKey: string;
  callback?: (arg: AccordionEventKey) => void;
};
function Toggle({ children, eventKey, callback }: contextAwareToggleProps) {
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
            onClick={() => setCreateProject(true)}
          />
        )}{" "}
        <FontAwesomeIcon icon={faCaretDown} onClick={decoratedOnClick} />{" "}
      </span>
    </h1>
  );
  const [HoverableSectionTitle] = useHover(sectionTitle);

  const isCurrentEventKey = activeEventKey === eventKey;

  return <div>{HoverableSectionTitle}</div>;
}
export function Navbar() {
  const [createProject, setCreateProject] = useState(false);

  return (
    <div className="sidebar">
      <div className="username">
        <span className="profile-picture"></span>jorgesaxon1234
      </div>
      <div className="times">
        <Link to="./">
          <div className="time active">Today</div>
        </Link>

        <Link to="./week">
          <div className="time">This Week</div>
        </Link>
        <div className="time">Eventually</div>
      </div>

      <CreateProjectModal
        show={createProject}
        handleClose={() => setCreateProject(false)}
      />
      <Accordion defaultActiveKey="0">
        <Card.Header>
          <Toggle eventKey="0"> </Toggle>
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
function CreateProjectModal({ show, handleClose }: createProjectModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
    <div className={`project color${color}`}>
      <div className="text">{text}</div>
      {hovered && (
        <span className="icon-more">
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      )}
    </div>
  );
  const [hoverable] = useHover(element);

  return <div>{hoverable}</div>;
}
