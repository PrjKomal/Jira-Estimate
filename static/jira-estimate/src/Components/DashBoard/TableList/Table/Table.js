import React, { useState } from 'react'
import styles from './styles.module.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const spaceCharacter = [
  {
    id: "gray",
    name: "Gray Goodspeed",
  },
  {
    id: "cato",
    name: "Little Cato",
  },
  {
    id: "kvn",
    name: "KVN",
  },
  {
    id: "mooncake",
    name: "MoonCake",
  },
]

const Table = () => {
  const [characters, updateCharacters] = useState(spaceCharacter);

  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <div className={styles.Table}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>{name}</div>
                      </li>
                    )}
                  </ Draggable>)
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Table