import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDragabbleCardProps) {
  console.log(toDo, index, " was change");
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
