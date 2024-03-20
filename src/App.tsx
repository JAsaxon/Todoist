import { BrowserRouter, Route, Routes } from "react-router-dom";
import Today from "./Today";
import ThisWeek from "./ThisWeek";
import { Navbar } from "./components/Navbar";
import { TasksContext, TasksDispatchContext } from "./TasksContext";
import { useEffect, useReducer } from "react";
import { reducer } from "./taskReducer";

const localTasks = localStorage.getItem("TASKS");
if (localTasks === null) {
  localStorage.setItem("TASKS", JSON.stringify([]));
}
const parsedLocalTasks = JSON.parse(localTasks!);
console.log(parsedLocalTasks, "EEE");
function App() {
  // @ts-ignore
  const [tasks, dispatch] = useReducer(reducer, parsedLocalTasks ?? []);
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <div className="app-box">
              <Navbar />

              <Routes>
                <Route path="/" element={<Today />} />
                <Route path="/week" element={<ThisWeek />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}
export type projectProps = {
  text: string;
  color: number;
};
export default App;
