import { useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import { toDoState } from "./atoms";

function ToDoList() {
  // Recoil Param

  // const value = useRecoilValue(todoState);
  // const modFn = useSetRecoilState(todoState);

  // Form

  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
