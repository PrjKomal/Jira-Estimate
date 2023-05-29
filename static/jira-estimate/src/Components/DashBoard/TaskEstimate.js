import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Filter from '../HOC/Filter/Filter'
import Table from './TableList/Table'
import { invoke } from '@forge/bridge'

const TaskEstimate = () => {
    const [project, setProject] = useState("")
    const [selectedUser, setSelectedUser] = useState([])
    const [count, setCount] = useState(0)
    console.log("project", project)
    const [data, setData] = useState([])
    const [projectList, setProjectList] = useState()

    useEffect(() => {
        (async () => {
            // Can be done using resolvers
            // TO get all issues 
            const data = await invoke('getAllIssues', { project_name: project });
            console.log("get all issues", data)
            setData(data)
        })();
    }, []);

    useEffect(()=>{
        const projectList = data.map(item=> item.project)
        console.log("projectList", projectList)
        setProjectList(projectList)

    },[data])


    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter setProject={setProject} setSelectedUser={setSelectedUser} selectedUser={selectedUser} count={count} setCount={setCount} />
                <Table project={project} selectedUser={selectedUser} count={count} />
            </div>
        </div>
    )
}

export default TaskEstimate