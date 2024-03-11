import { useState } from "react";
import "./styles/App.scss";
import { task } from "./types.ts";

import { Add } from "./Add.tsx";
import { Task } from "./Task.tsx";
import { Link } from "react-router-dom";
function App() {
  const [Tasks, setTasks] = useState<task[]>([]);
  function handleAdd(task: task) {
    setTasks((prev) => [...prev, task]);
  }

  function removeTaskFilter(uuid: string): task[] {
    return Tasks.filter((el) => el.id !== uuid);
  }
  function handleComplete(uuid: string) {
    const editedTask = Tasks.filter((el) => el.id === uuid)[0];
    editedTask.Completed = !editedTask.Completed;
    const rest = removeTaskFilter(uuid);
    setTasks(
      [...rest, editedTask].sort((a, b) => a.timeCreated - b.timeCreated)
    );
  }
  function handleDelete(uuid: string) {
    const rest = removeTaskFilter(uuid);
    setTasks([...rest].sort((a, b) => a.timeCreated - b.timeCreated));
  }
  return (
    <>
      <div className="app-box">
        <div className="sidebar">
          <div className="username">
            <span className="profile-picture"></span>jorgesaxon1234
          </div>
          <div className="times">
            <div className="time active">Todays</div>

            <Link to="./week">
              <div className="time">This Week</div>
            </Link>
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
          <TaskList
            tasks={Tasks}
            completeTask={handleComplete}
            deleteTask={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

type taskListProps = {
  tasks: task[];
  completeTask: (uuid: string) => void;
  deleteTask: (uuid: string) => void;
};
function TaskList({ tasks, completeTask, deleteTask }: taskListProps) {
  return (
    <div className="task-list">
      {tasks
        .slice()
        .reverse()
        .map((task: task) => {
          return (
            <Task
              task={task}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          );
        })}
    </div>
  );
}

export default App;
