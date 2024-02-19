import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface IForm {
  boardNm: string;
}

const Wrapper = styled.div`
  box-align: baseline;
`;

const Span = styled.span`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  margin-right: 10px;
`;

function BoardAdder() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ boardNm }: IForm) => {
    const newBoard = {
      id: Date.now(),
      title: boardNm,
      content: [],
    };

    setToDos((allBoards) => {
      return [...allBoards, newBoard];
    });
    setValue("boardNm", "");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <Span>Add Board</Span>
        <input {...register("boardNm", { required: true })} type="text" placeholder={`Add board`} />
      </form>
    </Wrapper>
  );
}

export default BoardAdder;
