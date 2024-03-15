import { FormEvent, useRef, useState } from "react";
import { section, task } from "../types.ts";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DateButton from "./DateButton.tsx";

export type addProps = {
  handleAdd: (Task: task) => void;
  section_id: section;
};
export const Add = ({ handleAdd, section_id }: addProps) => {
  const [formOpen, setFormOpen] = useState(false);
  function handleClose() {
    console.log("y58r", formOpen);
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
        />
      )}
    </div>
  );
};
type addFormProps = addProps & {
  handleClose: () => void;
  section_id: section;
};
function AddForm({ handleAdd, handleClose, section_id }: addFormProps) {
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const [enabled, setEnabled] = useState(false);
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
      });
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
    console.log(name.current?.value);
    return name.current?.value !== "";
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name of the task"
        name="name"
        autoFocus
        ref={name}
        onChange={updateEnabled}
      />
      <input
        type="text"
        placeholder="Description"
        className="description"
        ref={description}
      />
      <DateButton />
      <div className="buttons">
        <button onClick={() => handleClose()} type="button">
          Close
        </button>
        <button className={`submit-button ${enabled}`}>Add Task</button>
      </div>
    </form>
  );
}
