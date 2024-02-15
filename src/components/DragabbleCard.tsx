import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  isDragging: boolean;
  draggingOver: boolean;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  padding: 7px;
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0,0,0,0.2)" : "none")};
  margin-bottom: 5px;
  transition: all 0s;
  transform: ${(props) => (props.draggingOver ? "rotate(-45deg)" : "none")};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function getStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  const { moveTo } = snapshot.dropAnimation;
  if (snapshot.draggingOver === "trashCan") {
    return {
      ...style,
      transform: `translate(${moveTo.x}px, ${moveTo.y}px) rotate(2turn) scale(0)`,
      transition: `all linear 0.8s`,
    };
  } else {
    return style;
  }
}

function DraggableCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index} key={toDoId}>
      {(provided, snapshot) => {
        return (
          <Card
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver === "trashCan"}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            {toDoText}
          </Card>
        );
      }}
    </Draggable>
  );
}

export default memo(DraggableCard);
