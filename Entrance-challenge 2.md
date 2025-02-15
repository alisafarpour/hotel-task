# Functional Requirements

**As a** user,  
**I want** to see a list of hotels in Tehran within the application,  
**So that** I can view a brief overview of each hotel and its location.

### Acceptance Criteria
- **Filtering**: Users can filter hotels by searching for part of the hotel name or description.
- **Detailed View**: Users can view detailed information about a hotel on a separate page, including all details and user comments.
- **Map Integration**: Users can see all hotels in Tehran on a map and select a hotel to view its information.
---  

# Non-Functional Requirements

- **Performance**: The application must achieve high Core Web Vitals scores.
- **Architecture**: It should be a Progressive Web App (PWA) that utilizes the PRPL pattern.
- **Server-Side Rendering**: The application must support Server-Side Rendering (SSR) with E-tags for efficient browser caching.
- **Type Safety**: The project must prioritize high type safety.
- **Code Quality**: Adherence to SOLID principles and clean code is essential.
- **Frameworks**: No SSR frameworks must be used.
- **Optimization**: Optimize React re-rendering cycles to the greatest extent possible.
- **Testing**: Implement unit tests across the application.
- **Deployment**: Include a Dockerfile for deployment.

---  

## Additional Notes
- You are free to use any UI and Map library that meets your needs.
- Utilize [json-server](https://www.npmjs.com/package/json-server) for the backend API. Each hotel should adhere to the following object structure:
- Minimal UI design is required; therefore, CSS and styling issues can be deferred.
  ```json  
  {  
    "name": "Homa",  
    "description": "Tehran Homa Hotel, one of the most prestigious five-star hotels in the capital ...",  
    "location": {  
      "long": 50,  
      "lat": 50  
    },  
    "stars": 5  
  }

---  

## Bonuses
- Implement GitLab CI or GitHub Actions for continuous integration.
- Include a deployment YAML file for Kubernetes.
- Use React Query or any equivalent for data fetching.  



