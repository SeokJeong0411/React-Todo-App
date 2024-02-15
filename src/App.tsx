import { useRecoilState } from "recoil";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const TrashCan = styled.div`
  text-align: center;
  width: 200px;
  height: 70px;
  padding: 16px 15px;
  background-position: center;
  background-image: url("trashcan.svg");
  background-repeat: no-repeat;
  background-size: 70px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trashCan") {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
        };
      });
      return;
    }
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Droppable droppableId="trashCan">
          {(provided, snapshot) => (
            <TrashCan ref={provided.innerRef} {...provided.droppableProps}>
              {provided.placeholder}
            </TrashCan>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
