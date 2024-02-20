import { useRecoilState } from "recoil";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import BoardAdder from "./components/BoardAdder";

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

const Boards = styled.div``;

const Area = styled.div`
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
    const { destination, source } = info;

    if (!destination) return;

    // Board Move
    if (source.droppableId === "main") {
      setToDos((allBoards) => {
        const targetObj = { ...allBoards[source.index] };
        const boardsCopy = [...allBoards];
        boardsCopy.splice(source.index, 1);
        boardsCopy.splice(destination.index, 0, targetObj);

        return boardsCopy;
      });
      return;
    }

    // Card Move
    if (destination.droppableId === "trashCan") {
      setToDos((allBoards) => {
        const boardIndex = allBoards.findIndex((info) => String(info.id) === source.droppableId);

        // ToDos Info
        const toDosCopy = [...allBoards[boardIndex].content];
        toDosCopy.splice(source.index, 1);

        // Board Info
        const boardsCopy = [...allBoards];
        const newBoards = { ...allBoards[boardIndex], content: toDosCopy };
        boardsCopy.splice(boardIndex, 1, newBoards);

        return boardsCopy;
      });
      return;
    }

    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const targetIndex = allBoards.findIndex((info) => String(info.id) === source.droppableId);

        // ToDos Info
        const taskObj = [...allBoards[targetIndex].content][source.index];
        const targetToDosCopy = [...allBoards[targetIndex].content];
        targetToDosCopy.splice(source.index, 1);
        targetToDosCopy.splice(destination.index, 0, taskObj);

        // Board Info
        const boardsCopy = [...allBoards];
        const newBoards = { ...allBoards[targetIndex], content: targetToDosCopy };
        boardsCopy.splice(targetIndex, 1, newBoards);

        return boardsCopy;
      });
      return;
    } else {
      setToDos((allBoards) => {
        const sourceIndex = allBoards.findIndex((info) => String(info.id) === source.droppableId);
        const targetIndex = allBoards.findIndex((info) => String(info.id) === destination.droppableId);

        // ToDos Info
        const taskObj = [...allBoards[sourceIndex].content][source.index];
        const sourceToDosCopy = [...allBoards[sourceIndex].content];
        const targetToDosCopy = [...allBoards[targetIndex].content];
        sourceToDosCopy.splice(source.index, 1);
        targetToDosCopy.splice(destination.index, 0, taskObj);

        // Board Info
        const boardsCopy = [...allBoards];
        const oldBoards = { ...allBoards[sourceIndex], content: sourceToDosCopy };
        const newBoards = { ...allBoards[targetIndex], content: targetToDosCopy };
        boardsCopy.splice(sourceIndex, 1, oldBoards);
        boardsCopy.splice(targetIndex, 1, newBoards);

        return boardsCopy;
      });
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BoardAdder />
        <Boards>
          <Droppable droppableId="main" direction="horizontal" type="board">
            {(provided, snapshot) => {
              return (
                <Area ref={provided.innerRef} {...provided.droppableProps}>
                  {toDos.map(({ id, title, content }, index) => (
                    <Board boardId={id} title={title} key={id} toDos={content} index={index} />
                  ))}
                  {provided.placeholder}
                </Area>
              );
            }}
          </Droppable>
        </Boards>
        <Droppable droppableId="trashCan" type="card">
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
