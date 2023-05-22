import React from 'react'
import styles from './styles.module.scss'
import Filter from '../HOC/Filter/FIlter'
import Table from './TableList/Table'

const HomePage = () => {
    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>
                <spna>
                    Jira Estimates
                </spna>
                <span className={styles.anotherHeading}>Task Estimates</span>
            </div>
            <div className={styles.mainContainer}>
                <Filter />
                <Table />
            </div>
        </div>
    )
}

export default HomePage