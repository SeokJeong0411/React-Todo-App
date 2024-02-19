import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IBoard {
  id: number;
  title: string;
  content: IToDo[];
}

export const toDoState = atom<IBoard[]>({
  key: "toDo",
  default: [
    {
      id: 0,
      title: "To Do",
      content: [],
    },
    {
      id: 1,
      title: "Doing",
      content: [],
    },
    {
      id: 2,
      title: "Done",
      content: [],
    },
  ],
});
