import { Draggable, Droppable } from "react-beautiful-dnd";
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

const BoardHeader = styled.div`
  margin: 0 10px 10px 10px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-align: left;
  font-weight: 600;
  font-size: 18px;
`;

const CloseBtn = styled.img`
  width: 18px;
  padding: 2px;
  cursor: pointer;
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
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ boardId, toDos, title, index }: IBoardProps) {
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

  const onCloseClick = () => {
    setToDos((allBoards) => {
      const BoardsCopy = [...allBoards];
      BoardsCopy.splice(index, 1);

      return BoardsCopy;
    });
  };

  return (
    <Draggable draggableId={boardId + ""} index={index} key={boardId}>
      {(provided) => {
        return (
          <Wrapper ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <BoardHeader>
              <Title>{title}</Title>
              <CloseBtn src={"./btn_close.svg"} onClick={onCloseClick} />
            </BoardHeader>
            <Form onSubmit={handleSubmit(onValid)}>
              <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on "${title}"`} />
            </Form>

            <Droppable droppableId={String(boardId)} type="card">
              {(provided, snapshot) => {
                return (
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
                );
              }}
            </Droppable>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}

export default Board;
