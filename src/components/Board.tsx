import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 200px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0px;
  border-radius: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => (props.isDraggingOver ? "#b2bec3" : "transparent")};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px 15px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface IBoardProps {
  boardId: number;
  toDos: IToDo[];
  title: string;
}

interface IForm {
  toDo: string;
}

function Board({ boardId, toDos, title }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      const boardIndex = allBoards.findIndex((info) => info.id === boardId);

      const targetBoard = allBoards[boardIndex];
      const newToDos = [...targetBoard.content, newToDo];
      const newBoard = { ...targetBoard, content: newToDos };

      const BoardsCopy = [...allBoards];
      BoardsCopy.splice(boardIndex, 1, newBoard);

      return BoardsCopy;
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on "${title}"`} />
      </Form>

      <Droppable droppableId={String(boardId)}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
