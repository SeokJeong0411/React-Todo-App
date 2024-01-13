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
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Write a Email" />
        <input {...register("First Name")} placeholder="Write a First Name" />
        <input {...register("Last Name")} placeholder="Write a Last Name" />
        <input {...register("Username")} placeholder="Write a Username" />
        <input {...register("Password")} placeholder="Write a Password" />
        <input {...register("Password Confirmation")} placeholder="Write a Password Confirmation" />
        <button>+Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
