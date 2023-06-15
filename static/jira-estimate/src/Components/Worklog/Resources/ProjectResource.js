import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { v4 as uuidv4 } from 'uuid';
import rightArrowIcon from '../../../assests/images/Icon awesome-caret-down.svg';
import downArrowIcon from '../../../assests/images/Icon awesome-caret-down (1).svg';
import { invoke } from '@forge/bridge'

const ProjectResource = () => {

    const [allIssues, setAllIssues] = useState([])
    useEffect(() => {
        (async () => {
            // Can be done using resolvers
            // TO get all issues 
            const data = await invoke('getAllIssues', { project_name: "" });
            setAllIssues(data)
        })();
    }, []);



    const [userId, setUserId] = useState("")

    const handleCaretDownIcon = (id) => {
        setUserId(id)
    }
    const handleCaretUpIcon = () => {
        setUserId("")
    }

    // Get unique weekdays
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const transformedData = [];

    allIssues.forEach((issue) => {
        const { startDate, actualTime, project } = issue;
        const projectKey = JSON.stringify(project);

        let projectEntry = transformedData.find((entry) => entry.project === projectKey);
        if (!projectEntry) {
            projectEntry = {
                project: projectKey,
                weekdays: daysOfWeek.map((day) => ({
                    day,
                    totalTime: 0,
                    issues: []
                })),
                time: 0
            };
            transformedData.push(projectEntry);
        }

        const dayOfWeek = new Date(startDate).getDay();
        const dayIndex = dayOfWeek - 1;

        if (issue.actualTime) {
            projectEntry.weekdays[dayIndex].issues.push(issue);
            projectEntry.weekdays[dayIndex].totalTime += actualTime || 0;
        }
        projectEntry.time += actualTime || 0;
    });

    transformedData.forEach((projectEntry) => {
        projectEntry.project = JSON.parse(projectEntry.project);
    });

    const filteredData = transformedData.filter(item => Object.keys(item.project).length !== 0)

    const getTime = (time) => {
        if (time) {
            if (Math.floor(time / 3600) && ((time % 3600) / 60) > 0) {
                return Math.floor(time / 3600).toString() + "h" + " " + ((time % 3600) / 60).toString() + "m";
            } else if (Math.floor(time / 3600)) {
                return Math.floor(time / 3600).toString() + "h";
            } else if ((time % 3600) / 60) {
                return ((time % 3600) / 60).toString() + "m";
            }
        } else {
            return null;
        }
    }

    return (
        <div className={styles.worklogContainer}>
            <div className={styles.ColumnNames}>
                <div className={styles.nameColumn}>
                    <div className={styles.name}>Project</div>
                </div>
                <div className={styles.weekdays}>
                    {daysOfWeek.map((day, index) => {
                        return (
                            <div className={styles.Columns} key={index}>
                                <div className={styles.columnName}>{day}</div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.totalColumn}>
                    <div className={styles.name}>Total</div>
                </div>
            </div>
            <div className={styles.mainContainer}>
                {filteredData.map((item) => {
                    const id = item.project.project_id
                    return (
                        <div className={styles.tablebox}>
                            <div className={styles.userLists}>
                                <div key={item.project.project_id}>
                                    <div className={styles.userBox}>
                                        <div className={styles.userDetails}>
                                            <div className={styles.userName}>
                                                {userId == item.project.project_id ? <img src={downArrowIcon} className={styles.arrowDown} onClick={handleCaretUpIcon} /> : <img src={rightArrowIcon} className={styles.arrow} onClick={(e) => handleCaretDownIcon(item.project.project_id)} />}
                                                <img src={item.project.project_url} className={styles.userImg} />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.issueLists}>
                                {item.weekdays.map((item) => {
                                    return (
                                        <div className={styles.issues}>
                                            <>
                                                {getTime(item.totalTime) ? <div className={styles.cardBox} key={`${item.day}`}>
                                                    <div className={styles.time}>

                                                        {getTime(item.totalTime)}
                                                    </div>
                                                </div> : <div className={styles.cardBoxBlank} key={`${item.day}`}>

                                                </div>}

                                            </>
                                            {id === userId && item.issues.map((item, index) => {
                                                return (
                                                    <div key={item.id} index={index}>
                                                        <div id={item.key} className={styles.cardContainer} >
                                                            <div className={styles.taskName}>{item.summary}</div>
                                                            {item.epicName && <div className={styles.epicBox}>
                                                                <span className={styles.epicName}>{item.epicName}</span></div>}
                                                            <div className={styles.taskDetails}>
                                                                <div className={styles.imgWithProjectKey}>
                                                                    <img src={item.issuetype.iconUrl}
                                                                        name={item.issuetype.name}
                                                                    />
                                                                    <div className={styles.key}>{item.key}</div>
                                                                </div>
                                                                <div className={styles.userBoxActive}>
                                                                    <div id={item.id} className={styles.partitionBox} >
                                                                        <div id="original" className={styles.originalEstimate} title='Original Estimate'>{getTime(item.actualTime)}</div>
                                                                        <div id="actual" title='Actual Estimate' className={(item.status === "In Progress" || item.status === "QA") ? styles.InProgress : item.status === "Done" ? styles.Done : styles.actualEstimate}>{item.actualTime === null ? "0m" : getTime(item.actualTime)}</div>
                                                                    </div>
                                                                    <img src={item.priorityUrl} name="priority url" className={styles.priorityImg} />
                                                                    {Object.keys(item.assignee).length === 0 ? <div className={styles.blankDiv}></div> :

                                                                        <img src={item.assignee.assigneeUrl} name="user url" />
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>)
                                })}
                            </div>
                            <div className={styles.totalList}>
                                {getTime(item.time) ? <div className={styles.cardBox2}>
                                    <div className={styles.time}>
                                        {getTime(item.time)}
                                    </div>
                                </div> : ""}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectResource