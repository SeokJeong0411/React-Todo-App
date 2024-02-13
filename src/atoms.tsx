import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["1", "4", "5"],
    Doing: ["2", "3"],
    Done: ["6"],
  },
});
