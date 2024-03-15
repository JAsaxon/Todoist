import React from "react";
import "../styles/App.scss";
import { task, taskFunction } from "../types.ts";
import { payloadType } from "../taskReducer.ts";
import { Add } from "./Add.tsx";
import { Task } from "./Task.tsx";
import { useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../TasksContext.tsx";
import { section } from "../types";
import { DateCalendar } from "@mui/x-date-pickers";
type SectionProps = {
  title: string;
  section_id: section;
};

export default function Section({ title, section_id }: SectionProps) {
  const [reducerTasks, Dispatch] = [
    useContext(TasksContext),
    useContext(TasksDispatchContext),
  ];
  function getTasks(tasks: task[]) {
    return tasks.filter((task) => {
      return task.Section === section_id;
    });
  }
  console.log(reducerTasks, "Reducer Tasks");
  function handleAdd(task: task) {
    console.log(reducerTasks);
    Dispatch!({
      action: "HANDLE_ADD",
      handledTask: task,
    } as payloadType);
  }

  function removeTaskFilter(uuid: string): task[] {
    return reducerTasks!.filter((el) => el.id !== uuid);
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
        <Add handleAdd={handleAdd} section_id={section_id} />
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
