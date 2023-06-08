import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.module.scss'
import dropdownDownpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import dropdownUpIcon from '../../../assests/images/Icon feather-chevron-down.svg'
import { useOnOutsideClick } from '../useOnOutsideClick'
import { invoke } from '@forge/bridge';
import Avatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import searchIcon from '../../../assests/images/search.svg'
import closeIcon from '../../../assests/images/close.svg'


const Filter = (props) => {
  const { setProject, selectedUser, setSelectedUser, userList, input, setInput, selectedType, setSelectedType } = props
  const [showItems, setShowItem] = useState(false)
  const [showType, setShowType] = useState(false)
  const [selectedItem, setSelectedItem] = useState();

  const [projectsList, setProjects] = useState([])

  const typeList = [
    { id: 1, name: "Task", url: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium' },
    { id: 2, name: "Bug", url: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium' },
    { id: 3, name: "Story", url: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium' },
  ]

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
  const handelDropDownType = () => {
    setShowType(!showType)
  }
  const handleProject = (project_name) => {
    setSelectedItem(project_name)
    setProject(project_name)
    setShowItem(false)

  }

  const dropDownRef = useRef();
  const dropDownRefType = useRef();
  useOnOutsideClick(dropDownRef, () => {
    if (showItems) setShowItem(false);
  });
  useOnOutsideClick(dropDownRefType, () => {
    if (showType) setShowType(false);
  });

  const topCount = 4
  const bottomCount = userList.length - topCount;
  const [isOpen, setIsOpen] = useState(false)
  const handleMoreUser = () => {
    setIsOpen(!isOpen)
  }


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

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleCancel = () => {
    setInput("")
  }

  const handleOnchangeType = (e, id) => {
    if (e.target.checked) {
      setSelectedType([...selectedType, id])
    } else if (!e.target.checked) {
      setSelectedType(selectedType.filter(e => e != id))
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

        <div className={showItems ? styles.select_box__box_active : styles.select_box__box}>
          <div className={styles.select_box__container}>
            <div className={styles.select_box__selected_item} ref={dropDownRefType} onClick={handelDropDownType}>
              Type {selectedType.length > 0 && <span className={styles.count}>{selectedType.length}</span>}
            </div>
            <div className={styles.select_box__arrow} onClick={handelDropDownType}>
              {showType ? <img src={dropdownUpIcon} alt="" /> : <img src={dropdownDownpIcon} alt="" />}
            </div>

            {showType && <div className={styles.typeBox}>
              <div >
                {typeList.map((type) => {
                  return (
                    <label className={styles.type} htmlFor={type.name} key={type.id}>
                      <input type='checkbox' id={type.name} onChange={(e) => handleOnchangeType(e, type.name)} checked={selectedType.indexOf(type.name) >= 0} />
                      <img src={type.url} htmlFor={type.name} />
                      <span id={type.name}>{type.name}</span>
                    </label>
                  )

                })}
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <div>
          {input.length > 0 ? <img src={closeIcon} alt="close icon" onClick={handleCancel} /> :
            <img src={searchIcon} alt="search icon" />}
        </div>


      </div>
    </div>
  )
}

export default Filter