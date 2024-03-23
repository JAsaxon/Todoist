import { Link, useLocation } from "react-router-dom";
import { useHover } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCaretDown,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.scss";
import { ColourOption, colourOptions } from "../data/colorData";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import { CreateProjectModal } from "./CreateProjectModal";
import { projectType } from "../types";

export function Navbar() {
  const [createProject, setCreateProject] = useState(false);
  const [projects, setProjects] = useState([
    { color: colourOptions[1], title: "Social" },
    { color: colourOptions[4], title: "Web dev" },
    { color: colourOptions[7], title: "Work" },
  ]);
  function handleAdd(project: projectType) {
    setProjects((prev) => [...prev, project]);
  }
  function handleClose() {
    setCreateProject(false);
  }
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
        handleClose={handleClose}
        handleAdd={handleAdd}
        projects={projects}
      />
      <Accordion defaultActiveKey="0">
        <Card.Header>
          <ProjectsToggle eventKey="0" setModal={setCreateProject} />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <div className="projects">
            {projects.map((el) => {
              return <Project color={el.color} text={el.title} />;
            })}
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}

type ProjectsToggle = {
  eventKey: string;
  callback?: (arg: AccordionEventKey) => void;
  setModal: Dispatch<SetStateAction<boolean>>;
};
function ProjectsToggle({ eventKey, callback, setModal }: ProjectsToggle) {
  // const { activeEventKey } = useContext(AccordionContext);

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
  // const isCurrentEventKey = activeEventKey === eventKey;

  return <div>{HoverableSectionTitle}</div>;
}
type projectProps = {
  text: string;
  color: ColourOption;
};
function Project({ text, color }: projectProps) {
  const location = useLocation().pathname;
  console.log(location);
  const style = { "--color-attr": color.color } as React.CSSProperties;
  const element = (hovered: boolean) => (
    <Link to={`project/${encodeURIComponent(text)}`}>
      <div
        className={`project ${
          location === `/project/${encodeURIComponent(text)}` ? "active" : ""
        } 
        `}
        style={style}
      >
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
