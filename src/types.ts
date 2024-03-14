export type task = {
  Title: string;
  Description: string;
  Section: section;
  Completed: boolean;
  id: string;
  timeCreated: number;
};
export type section = "TODAY" | "WEEK" | string;
export type storageKeys = "TASKS";
export type taskFunction = (task: task) => void;
