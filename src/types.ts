export type task = {
  Title: string;
  Description: string;
  Section: section;
  Completed: boolean;
  id: string;
  timeCreated: number;
  dueDate: number;
};
export type section = "TODAY" | "WEEK" | string;
export type storageKeys = "TASKS";
export type taskFunction = (task: task) => void;
export type colorObject = { value: string; label: string; color: string };
