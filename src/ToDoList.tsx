import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [value, setValue] = useState("");

//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     setValue(e.currentTarget.value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(value);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={value} onChange={onChange} placeholder="Write a to do" />
//         <button>+Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("Email", { required: true })} placeholder="Write a Email" />
        <input {...register("First Name", { required: true })} placeholder="Write a First Name" />
        <input {...register("Last Name", { required: true })} placeholder="Write a Last Name" />
        <input
          {...register("Username", { required: true, minLength: { value: 5, message: "Your username is too short" } })}
          placeholder="Write a Username"
        />
        <input {...register("Password", { required: true })} placeholder="Write a Password" />
        <input {...register("Password Confirmation", { required: true })} placeholder="Write a Password Confirmation" />
        <button>+Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
