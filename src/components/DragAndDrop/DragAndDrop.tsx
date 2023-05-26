import React, { useState } from 'react';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend, DropTargetMonitor, DragSourceMonitor } from 'react-dnd-html5-backend';
import { Card, Container } from '@mantine/core';

interface DraggableProps {
  id: string;
  text: string;
}

const Draggable: React.FC<DraggableProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DRAGGABLE_COMPONENT',
    item: { id, text },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className='border mb-5'>{text}</Card>
    </div>
  );
};

interface DroppableProps {
  id: string;
  onDrop: (item: { id: string; text: string }) => void;
}

const Droppable: React.FC<DroppableProps> = ({ id, onDrop, children }) => {
  const [isOver, setIsOver] = useState(false);

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: 'DRAGGABLE_COMPONENT',
    drop: (item: { id: string; text: string }) => {
      onDrop(item);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Container
      style={{
        minHeight: 200,
        border: `1px solid ${isOver ? 'blue' : '#ddd'}`,
        backgroundColor: isOverCurrent ? 'lightblue' : 'white',
      }}
      ref={drop}
      onDragOver={handleDragOver}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
    >
      <div className='mt-5'>
        <h2 className='border-b-2 font-bold text-center mb-5 text-xl pb-2'>{id}</h2>
        {children}
      </div>
    </Container>
  );
};

const DragAndDrop = () => {
  const [columns, setColumns] = useState<{
    id: string;
    cards: { id: string; text: string }[];
  }[]>([
    { id: 'تسک', cards: [{ id: '1', text: 'تسک1' }, { id: '2', text: 'تسک2' }] },
    { id: 'انجام', cards: [{ id: '3', text: 'تسک3' }, { id: '4', text: 'تسک4' }] },
  ]);

  const handleDrop = (item: { id: string; text: string }, columnIndex: number) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      let draggedCard: { id: string; text: string } | undefined = undefined;
      for (let i = 0; i < updatedColumns.length; i++) {
        const column = updatedColumns[i];
        const cardIndex = column.cards.findIndex((card) => card.id === item.id);
        if (cardIndex !== -1) {
          draggedCard = column.cards[cardIndex];
          column.cards.splice(cardIndex, 1);
          break;
        }
      }
      if (draggedCard) {
        updatedColumns[columnIndex].cards.push(draggedCard);
      }
      return updatedColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex'>
        {columns.map((column, columnIndex) => (
          <Droppable key={column.id} id={column.id} onDrop={(item) => handleDrop(item, columnIndex)}>
            {column.cards.map((card) => (
              <Draggable key={card.id} id={card.id} text={card.text} />
            ))}
          </Droppable>
        ))}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
