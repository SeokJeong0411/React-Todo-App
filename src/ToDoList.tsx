import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, formState, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo", { required: "Please Write a To Do" })} placeholder="Write a to do" />
        <button>+Add</button>
      </form>
    </div>
  );
}

// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   password: string;
//   passwordConfirmation: string;
// }

// function ToDoList() {
//   const { register, handleSubmit, formState, setError } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });

//   const onValid = (data: IForm) => {
//     console.log(data);
//     if (data.password !== data.passwordConfirmation) {
//       setError("passwordConfirmation", { message: "Password are not the same" }, { shouldFocus: true });
//     }
//   };
//   console.log(formState.errors);
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onValid)}>
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: { value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-].[A-Za-z0-9._%+-]/, message: "Only Emails allowed" },
//           })}
//           placeholder="Write a Email"
//         />
//         <span>{formState.errors.email?.message as string}</span>
//         <input {...register("firstName", { required: true })} placeholder="Write a First Name" />
//         <input
//           {...register("lastName", {
//             required: true,
//             validate: {
//               noKim: (value) => !value.includes("Kim") || "no Kim",
//               noLee: (value) => (value.includes("Lee") ? "no Lee" : true),
//             },
//           })}
//           placeholder="Write a Last Name"
//         />
//         <input
//           {...register("userName", {
//             required: true,
//             minLength: { value: 5, message: "Your username is too short" },
//             validate: (value) => (value.includes("@") ? "no @" : true),
//           })}
//           placeholder="Write a Username"
//         />
//         <input {...register("password", { required: true })} placeholder="Write a Password" />
//         <input {...register("passwordConfirmation", { required: true })} placeholder="Write a Password Confirmation" />
//         <span>{formState.errors.passwordConfirmation?.message as string}</span>
//         <button>+Add</button>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
