import React, { useState } from 'react'
import styles from './styles.module.scss'
import Filter from '../HOC/Filter/FIlter'
import Table from './TableList/Table'

const TaskEstimate = () => {
    const [project, setProject] = useState("")
    console.log("project", project)
    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter setProject={setProject}/>
                <Table project={project}/>
            </div>
        </div>
    )
}

export default TaskEstimate