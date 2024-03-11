import { useState } from "react";
import "./styles/Task.scss";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { task } from "./types.ts";
export type taskJsxProps = {
  task: task;
  deleteTask: (uuid: string) => void;
  completeTask: (uuid: string) => void;
};
export function Task({ task, completeTask, deleteTask }: taskJsxProps) {
  const [hovered, setHovered] = useState(false);

  const handleHoverEnter = () => setHovered(true);
  const handleHoverLeave = () => setHovered(false);
  console.log(hovered);
  return (
    <div
      className="task-wrapper"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      <div
        className={`task ${task.Completed}`}
        onClick={() => completeTask(task.id)}
      >
        <input
          type="radio"
          name="task"
          id={task.Title}
          checked={task.Completed}
        />
        <div>
          <h1>{task.Title}</h1>
          <p>{task.Description}</p>
        </div>
      </div>
      <div className={`utilities ${hovered ? "hover" : ""}`}>
        <div className="close utility" onClick={() => deleteTask(task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
}
