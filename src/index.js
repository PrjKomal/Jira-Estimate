import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getAllProjects', async (req) => {
  try {
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/project`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});


resolver.define('getAllIssues', async (req) => {
  try {
    const project_name = req.payload.project_name
    var isSkip = true;
    var count = 0;
    var allIssues = []
    while (isSkip) {
      if (!project_name) {
        const response = await api

          .asApp()
          .requestJira(
            route`/rest/api/2/search?jql=sprint in openSprints()&startAt=${count}`,
            {
              headers: {
                Accept: 'application/json',
              },
            }
          );
        const data = await response.json();
        if (data.issues.length == 0) {
          isSkip = false;
        } else {
          count += 50
        }
        allIssues = allIssues.concat(data.issues)
      } else {
        const response = await api

          .asApp()
          .requestJira(
            route`/rest/api/2/search?jql=project=${project_name}&sprint in openSprints()&startAt=${count}`,
            {
              headers: {
                Accept: 'application/json',
              },
            }
          );
        const data = await response.json();
        if (data.issues.length == 0) {
          isSkip = false;
        } else {
          count += 50
        }
        allIssues = allIssues.concat(data.issues)
      }

    }

    const issuesData = allIssues.filter((item) => item.fields.issuetype.name !== "Epic").map(item => {
      return {
        id: item.id,
        key: item.key,
        summary: item.fields.summary,
        issuetype: {
          iconUrl: item.fields.issuetype.iconUrl,
          name: item.fields.issuetype.name
        },
        epicName: item.fields.parent === undefined ? "" : item.fields.parent.fields.summary,
        description: item.fields.description,
        assignee: item.fields.assignee == null ? {} : {
          accountId: item.fields.assignee.accountId,
          assigneeUrl: item.fields.assignee.avatarUrls["24x24"],
          displayName: item.fields.assignee.displayName,
        },
        startDate: item.fields.customfield_10015,
        duedate: item.fields.dueDate,
        project: {
          project_id: item.fields.project.id,
          project_key: item.fields.project.key,
        },
        priorityUrl: item.fields.priority.iconUrl,
        status: item.fields.status.name,
        actualTime: item.fields.timespent,
        originalTime: item.fields.aggregatetimeoriginalestimate
      }
    })

    return issuesData;
  } catch (error) {
    console.log(error);
  }
});


resolver.define('updateIssue', async (req) => {
  try {
    const { date, issueId } = req.payload;
    const response = await api
      .asApp()
      .requestJira(route`/rest/api/2/issue/${issueId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            customfield_10015: date
          },
        }),
      });
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
});

resolver.define('updateIssueTime', async (req) => {
  try {
    const { time, id } = req.payload;
    const response = await api
      .asApp()
      .requestJira(route`/rest/api/2/issue/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            timetracking: {
              originalEstimate: time
            }
          },
        }),
      });
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
});


export const handler = resolver.getDefinitions();

