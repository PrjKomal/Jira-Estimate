import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Avatar from '@atlaskit/avatar';
import { invoke } from '@forge/bridge';



const Table = (props) => {
  const { project, selectedUser, allIssues } = props

  const [columns, setColumns] = useState([]);

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
      const updatedCards = destItems.map((item, index) => {
        if (index === destination.index) {
          console.log("index", index)
          console.log("index", destination.index)
          console.log("index", new Date().toISOString().split('T')[0])
          return { ...item, startDate: new Date().toISOString().split('T')[0] };
        }
        return item;
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: updatedCards
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const updatedCards = destItems.map((item, index) => {
        if (index === destination.index) {
          console.log("index", index)
          console.log("index", destination.index)
          console.log("index", new Date().toISOString().split('T')[0])
          return { ...item, startDate: new Date().toISOString().split('T')[0] };
        }
        return item;
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: updatedCards
        }
      });
    }
  };
  console.log('allIssues', allIssues)
  const [state, setState] = useState("")
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [values, setValues] = useState({}); // Updated to store values for each card

  const handleClick = (e, id) => {
    const parentId = e.target.parentElement.id;
    const ownId = e.target.id;
    if (parentId === id) {
      setIsInputOpen(id);
      setState(ownId)
    }
  };

  const handleChange = (e, id) => {
    const inputId = id.toString() + "-" + state
    // console.log(s)
    const value = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [inputId]: value, // Store the value for the specific card id
    }));
  };

  const handleBlur = (e, id) => {
    setIsInputOpen("");
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
                          const inputId = `input-${item.id}`;
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
                                      <div className={isInputOpen === item.id ? styles.userBoxActive : styles.userBox}>
                                        {isInputOpen === item.id ?
                                          <input
                                            id={inputId}
                                            type="text"
                                            className={styles.inputBox}
                                            value={values[item.id.toString() + '-' + state] || ""} // Get the value from the state
                                            onChange={(e) => handleChange(e, item.id)} // Pass the card id to handleChange
                                            onBlur={(e) => handleBlur(e, item.id)} // Pass the card id to handleBlur
                                          /> :

                                          <div id={item.id} className={styles.partitionBox} >
                                            <span id="actual" onClick={(e) => handleClick(e, item.id)}>{values[item.id.toString() + '-actual'] || "0m"}</span>
                                            <div></div>
                                            <span id="original" onClick={(e) => handleClick(e, item.id)} >{values[item.id.toString() + '-original'] || "0m"}</span>
                                          </div>}

                                        <img src={item.priorityUrl} name="priority url" />
                                        {Object.keys(item.assignee).length === 0 ? <></> : <img src={item.assignee.assigneeUrl} name="user url" />}
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