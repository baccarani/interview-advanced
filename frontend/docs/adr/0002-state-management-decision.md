# State Management Decisions

### Submitters

[https://github.com/admclamb](admclamb)

Format:

- Online Community Builders


## Change Log

For state management, we should avoid using redux at the start and have the URL handle a lot of the state.


## Status

- [Proposed](https://github.com/online-community-builders/Chatter---frontend/pull/6) 2023-01-18


## Context

Using the URL for state management would have the following benefits:

- **Saving a spot**: By keeping the state in the URL whenever we can, it will be easy to remember your place and if someone bookmarks it, they'll be able to stay at the same spot.
- **Ease of sharing**: It will be able to share the state with other people as the state will be in the link.
- **Not as much code**: Using the URL for the state will prevent the need to have state management as a dependency and have to scaffold the state management.

Since we are currently using auth0 for user management, it will already have a global context in the application and will reduce the need for a state management library.

## Proposed Design

Have all page routes that need the state to have it as part of the route or a query param. For example:

- /interview/:interviewId The interview ID will be inside the URL and when the component mounts the interview will be fetched from the server.
- /interviews/search?q=software+engineering This could be an example of search functionality where the search query will be in the URL.

The whole project will be impacted as it will be everywhere in the client.


## Considerations

There will be some tradeoffs to using the URL as state, for example:

- **Potential for Sensitive Date Exposure**: Storing state in the URL can inadvertently lead to the exposure of sensitive data. For example, if we use /interview/:interviewId, it will expose the ID to the rest of the application.
- **User Experience Concerns**: The URLs can get long when storing state in the URLs and lead to a bad and overwhelming user experience. The alternative would be managing URL slugs which could increase complexity.
- **History Pollution**: Frequent changes in state can lead to cluttered browser history, making it difficult for users to navigate back to a specific state or page effectively 

Using a state management library like Redux would fix these issues.
