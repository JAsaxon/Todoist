import { FormEvent, useRef, useState } from "react";
import { section, task } from "../types.ts";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DateButton from "./DateButton.tsx";
import "../styles/addSection.scss";
import PriorityButton from "./PriorityButton.tsx";
export type addProps = {
  handleAdd: (Task: task) => void;
  section_id: section;
  defaultDueDate: number;
  title: string;
  isProject?: boolean;
};
export const Add = ({
  handleAdd,
  section_id,
  defaultDueDate,
  title,
  isProject,
}: addProps) => {
  const [formOpen, setFormOpen] = useState(false);
  function handleClose() {
    setFormOpen(false);
  }

  return (
    <div className="add-section">
      {!formOpen && (
        <div onClick={() => setFormOpen(true)}>
          {" "}
          <span className="add">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <input type="text" className="text" placeholder="Add task..." />
        </div>
      )}
      {formOpen && (
        <AddForm
          handleAdd={handleAdd}
          handleClose={handleClose}
          section_id={section_id}
          isProject={isProject}
          defaultDueDate={defaultDueDate}
          title={title}
        />
      )}
    </div>
  );
};
type addFormProps = addProps & {
  handleClose: () => void;
  section_id: section;
  defaultDueDate: number;
};
function AddForm({
  handleAdd,
  handleClose,
  section_id,
  defaultDueDate,
  title,
  isProject,
}: addFormProps) {
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [modifiedDueDate, setModifiedDueDate] = useState(defaultDueDate);
  const [priority, setPriority] = useState(4);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (enabled) {
      handleAdd({
        Title: name.current!.value,
        Description: description.current!.value,
        Section: section_id,
        Completed: false,
        id: uuid(),
        timeCreated: Date.now(),
        dueDate: modifiedDueDate,
        priority: priority,
      } as task);
      handleClose();
    }
  }
  function updateEnabled() {
    if (hasTitle()) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }
  function hasTitle(): boolean {
    return name.current?.value !== "";
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name of the task"
        className="title"
        name="name"
        autoFocus
        ref={name}
        onChange={updateEnabled}
      />
      <textarea
        placeholder="Description"
        className="description"
        ref={description}
      />
      <div className="filtering-buttons">
        <DateButton
          title={title}
          setDate={setModifiedDueDate}
          isProject={isProject}
        />
        <PriorityButton priority={priority} setPriority={setPriority} />
      </div>
      <div className="buttons">
        <button onClick={() => handleClose()} type="button">
          Close
        </button>
        <button className={`submit-button ${enabled}`}>Add Task</button>
        <ProjectSelect />
      </div>
    </form>
  );
}
function ProjectSelect() {
  return (
    <div className="project-select">
      <i className="fa-solid fa-inbox"></i>Project Select
      <i className="fa-solid fa-caret-down"></i>
    </div>
  );
}
