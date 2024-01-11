import { useState } from "react";

function ToDoList() {
  const [value, setValue] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} placeholder="Write a to do" />
        <button>+Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
