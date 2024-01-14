import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";

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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirmation: string;
}

function ToDoList() {
  const { register, handleSubmit, formState } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });

  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-].[A-Za-z0-9._%+-]/, message: "Only Emails allowed" },
          })}
          placeholder="Write a Email"
        />
        <span>{formState.errors.email?.message as string}</span>
        <input {...register("firstName", { required: true })} placeholder="Write a First Name" />
        <input {...register("lastName", { required: true })} placeholder="Write a Last Name" />
        <input
          {...register("userName", { required: true, minLength: { value: 5, message: "Your username is too short" } })}
          placeholder="Write a Username"
        />
        <input {...register("password", { required: true })} placeholder="Write a Password" />
        <input {...register("passwordConfirmation", { required: true })} placeholder="Write a Password Confirmation" />
        <button>+Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
