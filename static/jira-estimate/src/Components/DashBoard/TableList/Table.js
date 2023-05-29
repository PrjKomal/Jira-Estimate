import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Avatar from '@atlaskit/avatar';
import { invoke } from '@forge/bridge';



const Table = (props) => {
  const { project, selectedUser, count } = props

  const [columns, setColumns] = useState([]);
  const [allIssues, setAllIssues] = useState([])
  useEffect(() => {
    (async () => {
      // Can be done using resolvers
      // TO get all issues 
      if (selectedUser.length == 0) {
        const data = await invoke('getAllIssues', { project_name: project });
        console.log("get all issues", data)
        setAllIssues(data)
      } else {
        const data = await invoke('getAllIssues', { project_name: project });
        const filteredData = data.filter(item => {
          if (selectedUser.length == 0) {
            return item;
          } else {
            return selectedUser.includes(item.assigneeId);
          }
        })
        setAllIssues(filteredData)
      }
    })();
  }, [project, selectedUser]);

  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Estimates",
      items: allIssues.filter(item => {
        if (item.startDate === null) {
          return item;
        }
      })
    },
    [uuidv4()]: {
      name: "Monday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Monday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Tuesday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Tuesday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Wednesday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Wednesday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Thursday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Thursday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Friday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Friday") {
            return item;
          }
        }
      })
    }
  };

  useEffect(() => {
    setColumns(columnsFromBackend)
  }, [allIssues])

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
                                    <div className={styles.taskName}>{item.summary}</div>
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
                                        {item.assignee.length === 0 ? <></> : <Avatar appearance="square" size="small" src={item.assignee} name="url" />}
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