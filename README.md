# Angular-UI Back Office – Proof of Concept

This proof of concept has been built to test if a uni-directional data flow through UI-Routers is possible.

## Scope

- state management & nested routes / views using [UI-Router](https://github.com/angular-ui/ui-router)
- combine global (application/session level) params (e.g. filtering client, date range etc.) together with route specific params (e.g. sorting, pagination, filtering)
- all required params should be available before resources are fetched
- session service uses sessionStorage for persistence, this should be replaceable with window.location

## Learnings

- an explicit difference between global and route states have been made, as this prevents wrong implmentation and unexpected behaviour
- using location allows you to have more than 1 route state as it keeps the history
- the next route state needs to be available in state resolves, therefore ui-routers $state provider needs to be decorated with the next state
- every resolve needs the current resource params, therefore both the SessionService & $state are both required, can this be automated?:
     SessionService.resourceParams($state.nextState.name)
- OR can filters be resolved in the root state and made available through resolves because they are also needed in the route's controllers anyway
- for child collections resource params need to be overriden, this can easily be forgotten and should be "fixed"
- sort * filters can be made to directives be always need the current state's name
