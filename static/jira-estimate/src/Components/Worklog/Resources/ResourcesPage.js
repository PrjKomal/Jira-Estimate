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

    // Get unique weekdays
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // const [columns, setColumns] = useState(columnsFromBackend);

    const [userId, setUserId] = useState("")

    const handleCaretDownIcon = (id) => {
        setUserId(id)
    }
    const handleCaretUPIcon = () => {
        setUserId("")
    }
    const [data, setData] = useState()
    const assignees = Array.from(
        new Set(allIssues.map((issue) => issue.assignee.displayName))
    ).
        map((displayName) => {
            const issue = allIssues.find(
                (issue) =>
                    issue.assignee.displayName === displayName &&
                    Object.keys(issue.assignee).length !== 0
            );
            if (issue) {
                return {
                    displayName: issue.assignee.displayName,
                    assigneeUrl: issue.assignee.assigneeUrl,
                    accountId: issue.assignee.accountId,
                };
            }
        }).filter((item) => item !== undefined)

    // Calculate total time for each assignee
    const assigneeTotals = assignees.reduce((totals, assignee) => {
        const totalTime = allIssues
            .filter((issue) => issue.assignee.displayName === assignee.displayName && issue.actualTime)
            .reduce((total, issue) => {
                const time = issue.actualTime ? parseInt(issue.actualTime) : 0;
                return total + time;
            }, 0);

        const hours = Math.floor(totalTime / 3600);
        const minutes = (totalTime % 3600) / 60;

        totals[assignee.displayName] = {
            hours,
            minutes
        };
        return totals;
    }, {});


    console.log("assigneeTotals", assigneeTotals)
    // Retrieve time spent on a specific day for an assignee
    const getDayTime = (day, assignee) => {

        const totalTime = allIssues
            .filter(
                (issue) =>
                    issue.assignee.displayName === assignee.displayName &&
                    issue.startDate &&
                    new Date(issue.startDate).toLocaleDateString('en-US', { weekday: 'long' }) === day &&
                    issue.actualTime

            )
            .reduce((total, issue) => {
                const time = parseInt(issue.actualTime);
                return total + time;
            }, 0);


        if (totalTime) {
            return {
                hours: Math.floor(totalTime / 3600),
                minutes: (totalTime % 3600) / 60
            };
        } else {
            return null;
        }
    };



    return (
        <div className={styles.AnotherPageContainer}>
            <div className={styles.UserNameList}>
                <div className={styles.columnName}>Name</div>
                <div className={styles.DataBox}>
                    {assignees.map((user) => {
                        return (
                            <div key={user.accountId} className={styles.userBox}>
                                {userId == user.accountId ? <img src={downArrowIcon} className={styles.arrowDown} onClick={handleCaretUPIcon} /> : <img src={rightArrowIcon} className={styles.arrow} onClick={(e) => handleCaretDownIcon(user.accountId)} />}
                                <img src={user.assigneeUrl} className={styles.userImg} />
                            </div>)
                    })}
                </div>

            </div>
            {weekdays.map((day, index) => {
                return (
                    <div className={styles.Columns} key={index}>
                        <div className={styles.columnName}>{day}</div>
                        <div className={styles.DataBox}>
                            {assignees.map((assignee, index) => {
                                return (
                                    <>
                                        <div className={styles.cardBox} key={`${assignee.accountId}-${day}`}>
                                            <div className={styles.time}>

                                                {getDayTime(day, assignee) && `${getDayTime(day, assignee).hours}h ${getDayTime(day, assignee).minutes}m`}
                                            </div>
                                        </div>

                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <div className={styles.TotalList}>
                <div className={styles.columnName}>Total</div>
                <div className={styles.DataBox}>
                    {assignees.map((assignee) => {
                        const name = assignee.displayName;
                        return (<div className={styles.cardBox2} key={assignee.accountId}>
                            {/* Display total time for the assignee */}
                            <div className={styles.time}>
                                {`${assigneeTotals[name].hours}h ${assigneeTotals[name].minutes}m`}
                            </div>

                        </div>)
                    })}
                </div>
            </div>
        </div >

    )
}

export default ResourcesPage