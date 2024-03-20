import "../styles/App.scss";
import { task, taskFunction } from "../types.ts";
import { payloadType } from "../taskReducer.ts";
import { Add } from "./Add.tsx";
import { Task } from "./Task.tsx";
import { useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../TasksContext.tsx";
import { section } from "../types";
import moment from "moment";
type SectionProps = {
  title: string;
  section_id: section;
  dueDate: number;
  isProject?: boolean;
};
type possibleTitles = "Today" | "This Week";
const titleToDays = {
  Today: moment().add(1, "days").startOf("day"),
  "This Week": moment().day(7).startOf("day"),
};
export default function Section({
  title,
  section_id,
  dueDate,
  isProject,
}: SectionProps) {
  const [reducerTasks, Dispatch] = [
    useContext(TasksContext),
    useContext(TasksDispatchContext),
  ];
  console.log(reducerTasks);
  function getTasks(tasks: task[]) {
    if (isProject) {
      return tasks.filter((task) => {
        return task.Section === section_id;
      });
    }
    return tasks.filter((task) => {
      return moment(task.dueDate).isBefore(
        moment(titleToDays[title as possibleTitles])
      );
    });
  }
  function handleAdd(task: task) {
    Dispatch!({
      action: "HANDLE_ADD",
      handledTask: task,
    } as payloadType);
  }

  function handleComplete(task: task) {
    Dispatch!({
      action: "HANDLE_COMPLETE",
      handledTask: task,
      setComplete: !task.Completed,
    });
  }
  function handleDelete(task: task) {
    Dispatch!({
      action: "HANDLE_DELETE",
      handledTask: task,
    } as payloadType);
  }
  return (
    <>
      <div className="main-app">
        <h1 className="section">{title}</h1>
        <Add
          title={title}
          handleAdd={handleAdd}
          section_id={section_id}
          isProject={isProject}
          defaultDueDate={dueDate}
        />
        <TaskList
          tasks={getTasks(reducerTasks) as task[]}
          completeTask={handleComplete}
          deleteTask={handleDelete}
        />
      </div>
    </>
  );
}

type taskListProps = {
  tasks: task[];
  completeTask: taskFunction;
  deleteTask: taskFunction;
};
function TaskList({ tasks, completeTask, deleteTask }: taskListProps) {
  return (
    <div className="task-list">
      {tasks
        .slice()
        .reverse()
        .sort((a, b) => a.dueDate - b.dueDate)
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
