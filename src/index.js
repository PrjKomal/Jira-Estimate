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


resolver.define('getAllUsers', async (req) => {
  try {
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/users`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

    const data = await response.json();
    const filterData = data.filter(item => item.accountType === "atlassian" && item.active === true)

    return filterData;
  } catch (error) {
    console.log(error);
  }
});

resolver.define('getAllIssues', async (req) => {
  try {
    console.log("req", req)
    const project_name = req.payload.project_name
    if (!project_name) {
      const response = await api

        .asApp()
        .requestJira(
          route`/rest/api/3/search`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
      const data = await response.json();

      const issuesData = data.issues.map(item => {
        return {
          id: item.id,
          key: item.key,
          summary: item.fields.summary,
          iconUrl: item.fields.issuetype.iconUrl,
          description: item.fields.description != null ? item.fields.description.content.length > 0 ? item.fields.description.content[0].content[0].text : "" : "",
          assignee: item.fields.assignee == null ? "" : item.fields.assignee.avatarUrls["24x24"],
          assigneeId: item.fields.assignee == null  ? "":item.fields.assignee.accountId ,
          startDate: item.fields.customfield_10015,
          duedate: item.fields.dueDate
        }
      })

      return issuesData;
    }else{
      const response = await api

        .asApp()
        .requestJira(
          route`/rest/api/3/search?jql=project=${project_name}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
      const data = await response.json();

      const issuesData = data.issues.map(item => {
        return {
          id: item.id,
          key: item.key,
          summary: item.fields.summary,
          iconUrl: item.fields.issuetype.iconUrl,
          description: item.fields.description != null ? item.fields.description.content.length > 0 ? item.fields.description.content[0].content[0].text : "" : "",
          assignee: item.fields.assignee == null ? "" : item.fields.assignee.avatarUrls["24x24"],
          assigneeId: item.fields.assignee == null  ? "":item.fields.assignee.accountId ,
          startDate: item.fields.customfield_10015,
          duedate: item.fields.dueDate
        }
      })

      return issuesData;
    }
  } catch (error) {
    console.log(error);
  }
});

export const handler = resolver.getDefinitions();

