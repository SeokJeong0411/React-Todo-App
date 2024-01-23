import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onSubmit = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((prev) => [{ text: data.toDo, category, id: Date.now() }, ...prev]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("toDo", { required: "Please Write a To Do" })} placeholder="Write a to do" />
      <button>+Add</button>
    </form>
  );
}

export default CreateToDo;
