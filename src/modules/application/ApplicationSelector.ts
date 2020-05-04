"use strict";

import {createSelector} from "helpers/DataHelper"

import {CalendarEvents} from "modules/application/ApplicationReducer";

const applicationDataSelector: any = state => state.get("applicationData");


const eventsSelector: any = createSelector(
    applicationDataSelector, (applicationData: any) => applicationData.events
);

const searchedEventsSelector: any = createSelector(
    applicationDataSelector, (applicationData: any) => applicationData.searchedEvents
);

export interface IApplicationModuleProps {
    events?: Array<CalendarEvents>,
    searchedEvents?: Array<CalendarEvents>,
}

export default (state, variables = null) => {
    if (!variables) {
        return {
            events: eventsSelector(state),
            searchedEvents: searchedEventsSelector(state),
        }
    } else {
        return {
            events: variables.events ? eventsSelector(state) : null,
            searchedEvents: variables.searchedEvents ? searchedEventsSelector(state) : null,
        }
    }
};
