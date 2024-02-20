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

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    // setSelf -> Callbacks to set or reset the value of the atom.
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

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
  effects: [localStorageEffect("toDo")],
});
