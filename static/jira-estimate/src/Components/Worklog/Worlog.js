import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import ResourcesPage from './Resources/ResourcesPage'
import GroupByFilter from '../HOC/GroupByFilter/GroupByFilter'

const Worklog = () => {
    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Worklog</span>
            </div>
            <div className={styles.mainContainer}>
                <GroupByFilter />
                <ResourcesPage />
            </div>
        </div>
    )
}

export default Worklog