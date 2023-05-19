import React from 'react'
import styles from './styles.module.scss'
import Filter from '../HOC/Filter/FIlter'

const HomePage = () => {
    return (
        <div className={styles.HomePage}>
            <div className={styles.mainHeading}>Jira Estimate</div>
            <div className={styles.mainContainer}>
                <Filter />
            </div>
        </div>
    )
}

export default HomePage