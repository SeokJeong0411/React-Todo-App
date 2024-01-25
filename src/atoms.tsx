import { atom, selector } from "recoil";

/* ===== Interfaces ===== */
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/* ===== Atoms ===== */
// 카테고리 Atom
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// ToDo Atom
export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
  effects: [localStorageEffect("toDoList")],
});

/* ===== Selectors ===== */
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
