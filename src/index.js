import Resolver from '@forge/resolver';
import api, {  route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getAllProjects', async  (req) => {
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

export const handler = resolver.getDefinitions();

