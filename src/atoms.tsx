import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: ["1", "4", "5"],
    doing: ["2", "3"],
    done: ["6"],
  },
});
