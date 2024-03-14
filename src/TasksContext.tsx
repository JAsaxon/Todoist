import { createContext } from "react";
import { task } from "./types";
import { payloadType } from "./taskReducer";
export const TasksContext = createContext<task[]>([]);
type dispatchType = (payload: payloadType) => void;
export const TasksDispatchContext = createContext<dispatchType | null>(null);
