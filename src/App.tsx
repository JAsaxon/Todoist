import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.scss";
import { task } from "./types.ts";
import { Value } from "sass";
function App() {
  const [Tasks, setTasks] = useState<task[]>([]);
  function handleAdd(task: task) {
    setTasks((prev) => [...prev, task]);
  }
  return (
    <>
      <div className="app-box">
        <div className="sidebar">
          <div className="username">
            <span className="profile-picture"></span>jorgesaxon1234
          </div>
          <div className="times">
            <div className="time active">Today</div>
            <div className="time">This Week</div>
            <div className="time">Eventually</div>
          </div>
          <div className="projects">
            <div className="project color1">Social</div>
            <div className="project color2">Web development</div>
            <div className="project color3">Work</div>
          </div>
        </div>
        <div className="main-app">
          <h1 className="section">Today</h1>
          <Add handleAdd={handleAdd} />
          <TaskList tasks={Tasks} />
        </div>
      </div>
    </>
  );
}
export type addProps = {
  handleAdd: (Task: task) => void;
};
type taskListProps = {
  tasks: task[];
};
function TaskList({ tasks }: taskListProps) {
  return (
    <div className="taskList">
      {tasks.map((task: task) => {
        return <Task task={task} />;
      })}
    </div>
  );
}
type taskJsxProps = {
  task: task;
};
function Task({ task }: taskJsxProps) {
  return (
    <div className="task">
      <input
        type="radio"
        name="task"
        id={task.Title}
        checked={task.Completed}
      />
      <h1>{task.Title}</h1>
      <p>{task.Description}</p>
    </div>
  );
}
const Add = ({ handleAdd }: addProps) => {
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
          <span className="add">+</span>
          <input type="text" className="text" placeholder="Add task..." />
        </div>
      )}
      {formOpen && <AddForm handleAdd={handleAdd} handleClose={handleClose} />}
    </div>
  );
};
type addFormProps = addProps & {
  handleClose: () => void;
};
function AddForm({ handleAdd, handleClose }: addFormProps) {
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(name.current!.value, description.current!.value);
    handleAdd({
      Title: name.current!.value,
      Description: description.current!.value,
      Section: "TODAY",
      Completed: false,
    });
    handleClose();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name of the task"
        name="name"
        ref={name}
      />
      <input
        type="text"
        placeholder="Description"
        className="description"
        ref={description}
      />
      <div className="buttons">
        <button onClick={() => handleClose()} type="button">
          Close
        </button>
        <button>Add Task</button>
      </div>
    </form>
  );
}
export default App;
