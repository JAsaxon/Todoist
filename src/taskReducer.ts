import { task } from "./types";
export type actionType = "HANDLE_ADD" | "HANDLE_COMPLETE" | "HANDLE_DELETE";
export type payloadType = {
  handledTask: task;
  action: actionType;
  setComplete?: boolean;
};
function removeTaskFilter(Tasks: task[], uuid: string): task[] {
  return Tasks!.filter((el) => el.id !== uuid);
}
export function reducer(state: task[], payload: payloadType) {
  const Tasks = state;
  const currentTask = payload.handledTask;
  const uuid = payload.handledTask.id;
  const completedTask = {
    ...currentTask,
    Completed: payload.setComplete,
  } as task;
  // editedTask.Completed = !editedTask.Completed;
  const rest = removeTaskFilter(Tasks, uuid);
  console.log(payload.action, payload);
  switch (payload.action) {
    case "HANDLE_ADD":
      return [...state, payload.handledTask];
      break;
    case "HANDLE_COMPLETE":
      return [...[...rest, completedTask]].sort(
        (a, b) => a.timeCreated - b.timeCreated
      );
      break;
    case "HANDLE_DELETE":
      return [...rest];
    default:
      return [...state];
      break;
  }
}
