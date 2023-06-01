import React, { useState } from 'react';
import styles from './styles.module.scss';
import { v4 as uuidv4 } from 'uuid';
import  rightArrowIcon from '../../assests/images/Icon awesome-caret-down.svg';

const ResourcesPage = () => {
  const allIssues = [
    {
      id: '10014',
      key: 'TEST-11',
      summary: 'Another task',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      description: null,
      assignee: {},
      project: { project_id: '10001', project_key: 'TEST' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'To Do',
      startDate: null,
      duedate: undefined
    },
    {
      id: '10013',
      key: 'TEST-10',
      summary: 'Test board 1st task created',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      description: { version: 1, type: 'doc', content: [Array] },
      assignee: {
        accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
        assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
        displayName: 'Komal'
      },
      project: { project_id: '10001', project_key: 'TEST' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'To Do',
      startDate: null,
      duedate: undefined
    },
    {
      id: '10016',
      key: 'KAN-5',
      summary: 'VHJ',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
      description: null,
      assignee: {},
      project: { project_id: '10000', project_key: 'KAN' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'To Do',
      startDate: '2023-05-18',
      duedate: undefined
    },
    {
      id: '10003',
      key: 'KAN-4',
      summary: 'Test Bug',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      description: { version: 1, type: 'doc', content: [Array] },
      assignee: {
        accountId: '640eee615534b0bf743f5753',
        assigneeUrl: 'https://secure.gravatar.com/avatar/8ccef5c0f874eb307a477454dfd0a13e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKK-3.png',
        displayName: 'Khushi Kumari'
      },
      project: { project_id: '10000', project_key: 'KAN' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'Done',
      startDate: '2023-05-30',
      duedate: undefined
    },
    {
      id: '10001',
      key: 'KAN-2',
      summary: 'Test for another issue',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      description: { type: 'doc', version: 1, content: [] },
      assignee: {
        accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
        assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
        displayName: 'Komal'
      },
      project: { project_id: '10000', project_key: 'KAN' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'To Do',
      startDate: null,
      duedate: undefined
    },
    {
      id: '10000',
      key: 'KAN-1',
      summary: 'Task for fetch issue',
      iconUrl: 'https://first-forge-app.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      description: { version: 1, type: 'doc', content: [Array] },
      assignee: {
        accountId: '712020:ca1d6a91-f96f-4975-81de-a91797e08192',
        assigneeUrl: 'https://secure.gravatar.com/avatar/001b105e386299ed86f919f870c44cae?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FK-0.png',
        displayName: 'Komal'
      },
      project: { project_id: '10000', project_key: 'KAN' },
      priorityUrl: 'https://first-forge-app.atlassian.net/images/icons/priorities/medium.svg',
      status: 'In Progress',
      startDate: '2023-05-17',
      duedate: undefined
    }
  ]


  const userList = allIssues.map(item => item.assignee)
  const uniqueUser = [...new Map(userList.map((item) => [item["accountId"], item])).values()]
  const usersLists = uniqueUser.filter(item => Object.keys(item).length)
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Monday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Monday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Tuesday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Tuesday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Wednesday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Wednesday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Thursday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Thursday") {
            return item;
          }
        }
      })
    },
    [uuidv4()]: {
      name: "Friday",
      items: allIssues.filter(item => {
        if (item.startDate != null) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const date = new Date(item.startDate)
          const day = weekday[date.getDay()]
          if (day === "Friday") {
            return item;
          }
        }
      })
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className={styles.AnotherPageContainer}>
      <div className={styles.UserNameList}>
        <div className={styles.columnName}>Name</div>
        <div className={styles.DataBox}>
          {usersLists.map((user) => {
            return (
              <div key={user.accountId} className={styles.userBox}>
                <img src={rightArrowIcon} className={styles.arrow} />
                <img src={user.assigneeUrl} className={styles.userImg} />
              </div>)
          })}
        </div>

      </div>
      {Object.entries(columns).map(([columnId, column], index) => {
        return (
          <div className={styles.Columns} key={columnId}>
            <div className={styles.columnName}>{column.name}</div>
            <div className={styles.DataBox}>
              {column.items.map((item, index) => {
                return (
                  <div className={styles.cardBox}>
                    <div className={styles.time}>{item.startDate}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className={styles.TotalList}>
        <div className={styles.columnName}>Total</div>
      </div>
    </div>

  )
}

export default ResourcesPage