import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.module.scss'
import dropdownDownpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import dropdownUpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import { useOnOutsideClick } from '../useOnOutsideClick'
import { invoke } from '@forge/bridge';
import AvatarGroup from '@atlaskit/avatar-group';
import Tooltip from '@atlaskit/tooltip';
import searchIcon from '../../../assests/images/Icon ionic-ios-search.svg'


const Filter = (props) => {
  const { setProject, selectedUser, setSelectedUser, projectList, userList } = props
  const [showItems, setShowItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState();

  const [projectsList, setProjects] = useState([])

  useEffect(() => {
    (async () => {
      // Can be done using resolvers
      // TO get all projects 
      const data = await invoke('getAllProjects');
      setProjects(data)

    })();
    return () => { };
  }, []);


  const handelDropDown = () => {
    setShowItem(!showItems)
  }
  const handleProject = (project_name) => {
    setSelectedItem(project_name)
    setProject(project_name)
    setShowItem(false)

  }

  const dropDownRef = useRef();
  useOnOutsideClick(dropDownRef, () => {
    if (showItems) setShowItem(false);
  });

  const topCount = 4
  const bottomCount = userList.length - topCount;
  const [isOpen, setIsOpen] = useState(false)
  const handleMoreUser = () => {
    setIsOpen(!isOpen)
  }

  // const [selectedUser, setSelectedUser] = useState([])/
  const [check, setCheck] = useState(false)
  const handleOnchange = (e, id) => {
    setCheck(e.target.checked)
    if (e.target.checked) {
      setSelectedUser([...selectedUser, id])
    } else if (!e.target.checked) {
      setSelectedUser(selectedUser.filter(e => e != id))
    }
  }

  const handleSelect = (e, id) => {
    if (selectedUser.includes(id)) {
      setSelectedUser(selectedUser.filter(e => e != id))
    } else {
      setSelectedUser([...selectedUser, id])
    }
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSelect}>
        <div className={showItems ? styles.select_box__box_active : styles.select_box__box}>
          <div className={styles.select_box__container}>
            <div className={styles.select_box__selected_item} ref={dropDownRef} onClick={handelDropDown}>
              {selectedItem ? selectedItem : "Project"}
            </div>
            <div className={styles.select_box__arrow} onClick={handelDropDown}>
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
        <div className={styles.userMain}>
          <div className={styles.userContainer}>
            {userList.map((item, index) => {
              if (index < topCount) {
                return (
                  <div key={item.accountId} className={styles.userBox} onClick={(e) => handleSelect(e, item.accountId)}>
                    <Tooltip content={item.displayName}>
                      {(tooltipProps) => (
                        <div className={selectedUser.includes(item.accountId) ? styles.userdetailsActive : styles.userdetails} {...tooltipProps}>
                          <img src={item.assigneeUrl} className={styles.userImage} />
                        </div>
                      )}
                    </Tooltip>
                  </div>
                )
              } else if (index == 5) {
                return (
                  <div key={item.accountId} className={styles.userBox} >
                    <div className={styles.userdetails2} onClick={handleMoreUser}>
                      <span>+{bottomCount}</span>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          {isOpen && <div className={styles.userBox2}>
            <div className={styles.user}>
              {userList.map((item, index) => {
                if (topCount < index) {
                  return (
                    <label className={styles.user2} htmlFor={item.displayName} key={item.accountId}>
                      <input type='checkbox' id={item.displayName} onChange={(e) => handleOnchange(e, item.accountId)} />
                      <img src={item.assigneeUrl} htmlFor={item.displayName} />
                      <span htmlFor={item.displayName}>{item.displayName}</span>
                    </label>
                  )
                }
              })}
            </div>
          </div>}

        </div>
      </div>
      <div className={styles.search}>
        <input
          type="text"
        />
        <div>
          <img src={searchIcon} alt="search icon" />
        </div>


      </div>
    </div>
  )
}

export default Filter