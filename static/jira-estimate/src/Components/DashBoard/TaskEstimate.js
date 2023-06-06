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

    const [input, setInput] = useState("")

    useEffect(() => {
        (async () => {
                // Can be done using resolvers
                // TO get all issues 

                const data = await invoke('getAllIssues', { project_name: project });
                //get user list
                const userList = data.map(item => item.assignee)
                // remove duplicate user from array
                const uniqueUser = [...new Map(userList.map((item) => [item["accountId"], item])).values()]
                setUserList(uniqueUser.filter(item => Object.keys(item).length))
                if (selectedUser.length == 0 && input.length == 0) {
                    const filteredByInput = data.filter((item) => item.summary.toLowerCase().includes(input.toLowerCase()))
                    setAllIssues(filteredByInput)
                } else if (selectedUser.length > 0 && input.length > 0) {
                    const filteredData = data.filter(item => selectedUser.includes(item.assignee.accountId) && item.summary.toLowerCase().includes(input.toLowerCase()))
                    setAllIssues(filteredData)
                } else if (selectedUser.length > 0) {
                    const filteredData = data.filter(item => selectedUser.includes(item.assignee.accountId))
                    setAllIssues(filteredData)
                } else if (input) {
                    const filteredData = data.filter(item => item.summary.toLowerCase().includes(input.toLowerCase()))
                    setAllIssues(filteredData)
                }
            })();
    }, [project, selectedUser, input]);



    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter setProject={setProject} setSelectedUser={setSelectedUser} selectedUser={selectedUser} userList={userList} input={input} setInput={setInput} />
                <Table project={project} selectedUser={selectedUser} allIssues={allIssues} />
            </div>
        </div>
    )
}

export default TaskEstimate