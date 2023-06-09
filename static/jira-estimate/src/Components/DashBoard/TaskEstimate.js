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
    const [apiData, setApiData] = useState([])
    const [selectedType, setSelectedType] = useState([])

    const [input, setInput] = useState("")

    useEffect(() => {
        (async () => {
            // Can be done using resolvers
            // TO get all issues 

            const data = await invoke('getAllIssues', { project_name: project });
            setApiData(data);

        })();
    }, [project]);


    useEffect(() => {
        // Get user list
        const userList = apiData.map(item => item.assignee);
        // Remove duplicate users from the array
        const uniqueUser = [...new Map(userList.map(item => [item["accountId"], item])).values()];
        setUserList(uniqueUser.filter(item => Object.keys(item).length));

        // Filter data based on selected user, selected type, and input
        let filteredData = apiData;

        if (selectedUser.length > 0) {
            filteredData = filteredData.filter(item => selectedUser.includes(item.assignee.accountId));
        }

        if (selectedType.length > 0) {
            filteredData = filteredData.filter(item => selectedType.includes(item.issuetype.name));
        }

        if (input) {
            const inputLowerCase = input.toLowerCase();
            filteredData = filteredData.filter(item => item.summary.toLowerCase().includes(inputLowerCase));
        }

        setAllIssues(filteredData);
    }, [apiData, selectedUser, selectedType, input]);

    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter setProject={setProject} setSelectedUser={setSelectedUser} selectedUser={selectedUser} userList={userList} input={input} setInput={setInput} selectedType={selectedType} setSelectedType={setSelectedType} />
                <Table project={project} selectedUser={selectedUser} allIssues={allIssues} />
            </div>
        </div>
    )
}

export default TaskEstimate