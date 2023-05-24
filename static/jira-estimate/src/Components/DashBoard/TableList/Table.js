import React, { useState } from 'react'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Avatar from '@atlaskit/avatar';

const itemsFromBackend = [
  {
    id: uuidv4(),
    content: "First task",
    description: "This is description",
    key: "KAN-1",
    iconUrl: "https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
    assignee: {
      avatarUrls: {
        "24x24": "https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png"
      }
    }
  },
  {
    id: uuidv4(),
    content: "Second task",
    description: "It is a long established fact that a reader will be distracted .",
    key: "KAN-2",
    iconUrl: "https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
    assignee: {
      avatarUrls: {
        "24x24": "https://secure.gravatar.com/avatar/f1e22dfa36aec9d6f92d229219ad4638?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKK-2.png"
      }
    }
  },
  {
    id: uuidv4(),
    content: "Third task",
    description: "It is a long established fact that a reader will be distracted It is a long established fact that a reader will be distracted It is a long established fact that a reader will be distracted It is a long established fact that a reader will be distracted .",
    key: "TEST-1",
    iconUrl: "https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
    assignee: {
      avatarUrls: {
        "24x24": "https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png"
      }
    }
  },
  {
    id: uuidv4(),
    content: "Fourth task",
    description: "It is a long established fact that a reader will be distracted .",
    key: "KAN-3",
    iconUrl: "https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium",
    assignee: {
      avatarUrls: {
        "24x24": "https://secure.gravatar.com/avatar/f1e22dfa36aec9d6f92d229219ad4638?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKK-2.png"
      }
    }
  },
  {
    id: uuidv4(),
    content: "Fifth task",
    description: "This is description",
    key: "TEST-2",
    iconUrl: "https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
    assignee: {
      avatarUrls: {
        "24x24": "https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png"
      }
    }
  }
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Estimates",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "Monday",
    items: []
  },
  [uuidv4()]: {
    name: "Tuesday",
    items: []
  },
  [uuidv4()]: {
    name: "Wednesday",
    items: []
  },
  [uuidv4()]: {
    name: "Thursday",
    items: []
  },
  [uuidv4()]: {
    name: "Friday",
    items: []
  }
};


const Table = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


  return (
    <div className={styles.TableContainer}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className={styles.TableList}
              key={columnId}
            >
              <div className={styles.columnName}>{column.name}</div>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          paddingTop: 10,
                          width: 220,
                          minHeight: 500,
                          marginLeft: 13
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      width: "189px",
                                      height: "110px",
                                      backgroundColor: "#FFFFFF",
                                      boxShadow: " 0px 2px 2px #00000029",
                                      borderRadius: "8px",
                                      opacity: 1,
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div className={styles.taskName}>{item.content}</div>
                                    <div className={styles.taskDescription}>{item.description}</div>

                                    <div className={styles.taskDetails}>
                                      <div className={styles.imgWithProjectKey}>
                                        <Avatar
                                          size="xsmall"
                                          appearance="square"
                                          src={item.iconUrl}
                                          name="Nucleus"
                                        />
                                        <div className={styles.key}>{item.key}</div>
                                      </div>
                                      <div>
                                        <Avatar appearance="square" size="small" src={item.assignee.avatarUrls["24x24"]} name="url" />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div >
          );
        })}
      </DragDropContext >
    </div >
  )
}

export default Table