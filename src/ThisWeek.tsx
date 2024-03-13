import "./styles/App.scss";
import { task } from "./types.ts";

import { Add } from "./components/Add.tsx";
import { Task } from "./components/Task.tsx";
import { useLocalStorage } from "react-use";
export default function ThisWeek() {
  const [Tasks, setTasks] = useLocalStorage<task[]>("WEEK", []);
  function handleAdd(task: task) {
    setTasks((prev) => [...(prev as task[]), task]);
  }

  function removeTaskFilter(uuid: string): task[] {
    return Tasks!.filter((el) => el.id !== uuid);
  }
  function handleComplete(uuid: string) {
    const editedTask = Tasks!.filter((el) => el.id === uuid)[0];
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
      <div className="main-app">
        <h1 className="section">This Week</h1>
        <Add handleAdd={handleAdd} />
        <TaskList
          tasks={Tasks as task[]}
          completeTask={handleComplete}
          deleteTask={handleDelete}
        />
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
