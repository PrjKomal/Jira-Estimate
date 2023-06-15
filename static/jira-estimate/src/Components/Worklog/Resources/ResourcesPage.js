import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { v4 as uuidv4 } from 'uuid';
import rightArrowIcon from '../../../assests/images/Icon awesome-caret-down.svg';
import downArrowIcon from '../../../assests/images/Icon awesome-caret-down (1).svg';
import { invoke } from '@forge/bridge'

const ResourcesPage = () => {
    // const allIssues = [
    //     {
    //         id: '10014',
    //         key: 'TEST-11',
    //         summary: 'Another task',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    //         description: null,
    //         assignee: {},
    //         project: { project_id: '10001', project_key: 'TEST' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'To Do',
    //         startDate: null,
    //         duedate: undefined,
    //         actualTime: null
    //     },
    //     {
    //         id: '10013',
    //         key: 'TEST-10',
    //         summary: 'Test board 1st task created',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    //         description: null,
    //         assignee: {
    //             accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
    //             assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
    //             displayName: 'Komal'
    //         },
    //         project: { project_id: '10001', project_key: 'TEST' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'To Do',
    //         startDate: '2023-05-17',
    //         duedate: undefined,
    //         actualTime: "30m"
    //     },
    //     {
    //         id: '10016',
    //         key: 'KAN-5',
    //         summary: 'VHJ',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
    //         description: null,
    //         assignee: {},
    //         project: { project_id: '10000', project_key: 'KAN' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'To Do',
    //         startDate: '2023-05-18',
    //         duedate: undefined,
    //         actualTime: null
    //     },
    //     {
    //         id: '10003',
    //         key: 'KAN-4',
    //         summary: 'Test Bug',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    //         description: null,
    //         assignee: {
    //             accountId: '640eee615534b0bf743f5753',
    //             assigneeUrl: 'https://secure.gravatar.com/avatar/8ccef5c0f874eb307a477454dfd0a13e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKK-3.png',
    //             displayName: 'Khushi Kumari'
    //         },
    //         project: { project_id: '10000', project_key: 'KAN' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'Done',
    //         startDate: '2023-05-30',
    //         duedate: undefined,
    //         actualTime: "30m"
    //     },
    //     {
    //         id: '10001',
    //         key: 'KAN-2',
    //         summary: 'Test for another issue',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    //         description: null,
    //         assignee: {
    //             accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
    //             assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
    //             displayName: 'Komal'
    //         },
    //         project: { project_id: '10000', project_key: 'KAN' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'To Do',
    //         startDate: '2023-05-18',
    //         duedate: undefined,
    //         actualTime: "30m"
    //     },
    //     {
    //         id: '10000',
    //         key: 'KAN-1',
    //         summary: 'Task for fetch issue',
    //         iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    //         description: null,
    //         assignee: {
    //             accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
    //             assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
    //             displayName: 'Komal'
    //         },
    //         project: { project_id: '10000', project_key: 'KAN' },
    //         priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
    //         status: 'In Progress',
    //         startDate: '2023-05-17',
    //         duedate: undefined,
    //         actualTime: "30m"
    //     }
    // ]

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
        const { startDate, actualTime, assignee } = issue;
        const assigneeKey = JSON.stringify(assignee);

        let assigneeEntry = transformedData.find((entry) => entry.assignee === assigneeKey);
        if (!assigneeEntry) {
            assigneeEntry = {
                assignee: assigneeKey,
                weekdays: daysOfWeek.map((day) => ({
                    day,
                    totalTime: 0,
                    issues: []
                })),
                time: 0
            };
            transformedData.push(assigneeEntry);
        }

        const dayOfWeek = new Date(startDate).getDay();
        const dayIndex = dayOfWeek - 1;

        if (issue.actualTime) {
            assigneeEntry.weekdays[dayIndex].issues.push(issue);
            assigneeEntry.weekdays[dayIndex].totalTime += actualTime || 0;
        }
        assigneeEntry.time += actualTime || 0;
    });

    transformedData.forEach((assigneeEntry) => {
        assigneeEntry.assignee = JSON.parse(assigneeEntry.assignee);
    });

    const filteredData = transformedData.filter(item => Object.keys(item.assignee).length !== 0)

    const getTime = (time) => {
        if (time) {
            const data = time / 60;
            if (data >= 60) {
                const time = data / 60;
                return time.toString() + "h";
            } else {
                return data.toString() + "m";
            }
        } else {
            return null;
        }
    }

    return (
        <div className={styles.worklogContainer}>
            <div className={styles.ColumnNames}>
                <div className={styles.nameColumn}>
                    <div className={styles.name}>Name</div>
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
                    const id = item.assignee.accountId
                    return (
                        <div className={styles.tablebox}>
                            <div className={styles.userLists}>
                                <div key={item.assignee.accountId}>
                                    <div className={styles.userBox}>
                                        <div className={styles.userDetails}>
                                            <div className={styles.userName}>
                                                {userId == item.assignee.accountId ? <img src={downArrowIcon} className={styles.arrowDown} onClick={handleCaretUpIcon} /> : <img src={rightArrowIcon} className={styles.arrow} onClick={(e) => handleCaretDownIcon(item.assignee.accountId)} />}
                                                <img src={item.assignee.assigneeUrl} className={styles.userImg} />
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

export default ResourcesPage