import { useState } from "react"
import "./App.scss"
import { task } from "./types.ts"
function App() {
  const [Tasks, setTasks] = useState<task[]>([])
  function handleAdd(task: task) {}
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
        </div>
      </div>
    </>
  )
}
export type addProps = {
  handleAdd: (Task: task) => void
}
type taskListProps = {
  tasks: task[]
}
function TaskList({ tasks }: taskListProps) {
  return (
    <div className="taskList">
      {tasks.map((task: task) => {
        return <Task task={task} />
      })}
    </div>
  )
}
type taskJsxProps = {
  task: task
}
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
  )
}
const Add = ({ handleAdd }: addProps) => {
  return (
    <div className="add-section">
      <span className="add">+</span>
      <span className="text">Add task...</span>
    </div>
  )
}

export default App
