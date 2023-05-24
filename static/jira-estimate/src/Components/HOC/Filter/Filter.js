import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.module.scss'
import dropdownDownpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import dropdownUpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import { useOnOutsideClick } from '../useOnOutsideClick'
import { invoke } from '@forge/bridge';
const Filter = () => {
  const [showItems, setShowItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState();

  const [projectsList, setProjects] = useState([])
  
  useEffect(() => {
    (async () => {
      // Can be done using resolvers
      // TO get all projects 
      const data = await invoke('getAllProjects');
      console.log("data", data)
      setProjects(data)

    })();
    return () => { };
  }, []);

  const handelDropDown = () => {
    setShowItem(!showItems)
  }
  const handleProject = (project_name) => {
    setSelectedItem(project_name)
    setShowItem(false)
  }

  const dropDownRef = useRef();
  useOnOutsideClick(dropDownRef, () => {
    if (showItems) setShowItem(false);
  });


  return (
    <div className={styles.filterContainer}>

      <div className={styles.filterHeading}>Group By</div>
      <div className={styles.filterBox}>
        <div className={showItems ? styles.select_box__box_active : styles.select_box__box}>
          <div className={styles.select_box__container}>
            <div className={styles.select_box__selected_item} ref={dropDownRef} onClick={handelDropDown}>
              {selectedItem ? selectedItem : "Project"}
            </div>
            <div className={styles.select_box__arrow}  onClick={handelDropDown}>
              {showItems ? <img src={dropdownUpIcon} alt="" /> : <img src={dropdownDownpIcon} alt="" />}
            </div>

            <div
              style={{ display: showItems ? "block" : "none", }}
              className={styles.select_box__items}
            >
              {projectsList?.map(project => (
                <div
                  key={project.id}
                  onClick={() => handleProject(project.key)}>
                  {project?.key}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Filter