import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Filter from '../HOC/Filter/Filter'
import Table from './TableList/Table'
import { invoke } from '@forge/bridge'

const TaskEstimate = () => {
    const [project, setProject] = useState("")
    const [selectedUser, setSelectedUser] = useState([])
    const [userList, setUserList] = useState([])
    const [allIssues, setAllIssues] = useState([])

    useEffect(() => {
        (async () => {
            // Can be done using resolvers
            // TO get all issues 
            if (selectedUser.length == 0) {
                const data = await invoke('getAllIssues', { project_name: project });
                console.log("get all issues", data)
                const userList = data.map(item => item.assignee)
                // remove duplicate object from array
                const uniqueUser = [...new Map(userList.map((item) => [item["accountId"], item])).values()]
                setUserList(uniqueUser.filter(item => Object.keys(item).length))
                setAllIssues(data)
            } else {
                const data = await invoke('getAllIssues', { project_name: project });
                const userList = data.map(item => item.assignee)
                // remove duplicate object from array
                const uniqueUser = [...new Map(userList.map((item) => [item["accountId"], item])).values()]
                setUserList(uniqueUser.filter(item => Object.keys(item).length))
                const filteredData = data.filter(item => {
                    if (selectedUser.length == 0) {
                        return item;
                    } else {
                        return selectedUser.includes(item.assignee.accountId);
                    }
                })
                setAllIssues(filteredData)
            }
        })();
    }, [project, selectedUser]);

    // useEffect(() => {

    //     // get user list from search issues api
    //     const userList = allIssues.map(item => item.assignee)
    //     // remove duplicate object from array
    //     const uniqueUser = [...new Map(userList.map((item) => [item["accountId"], item])).values()]
    //     setUserList(uniqueUser.filter(item => Object.keys(item).length))

    // }, [allIssues])

    console.log("userList", userList)

    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter setProject={setProject} setSelectedUser={setSelectedUser} selectedUser={selectedUser} userList={userList} />
                <Table project={project} selectedUser={selectedUser} allIssues={allIssues} />
            </div>
        </div>
    )
}

export default TaskEstimate