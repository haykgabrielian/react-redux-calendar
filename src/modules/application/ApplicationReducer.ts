"use strict";

import {IApplicationActions} from "modules/application/ApplicationActions";
import { eventsData } from "helpers/calendarDummyData";

interface IApplicationReducerActions {
    EVENT_CREATE: string;
    EVENT_STATUS_UPDATE: string;
    EVENT_DELETE: string;
    ATTEMPT_SEARCH_EVENTS: string;
    SEARCH_EVENTS: string;
}

export const actions: IApplicationReducerActions = {
    EVENT_CREATE: "APPLICATION:EVENT_CREATE",
    EVENT_STATUS_UPDATE: "APPLICATION:EVENT_STATUS_UPDATE",
    EVENT_DELETE: "APPLICATION:EVENT_DELETE",
    ATTEMPT_SEARCH_EVENTS: "APPLICATION:ATTEMPT_SEARCH_EVENTS",
    SEARCH_EVENTS: "APPLICATION:SEARCH_EVENTS",
};

export interface CalendarEvents {
    id: number,
    date: string,
    title: string,
    description: string,
    color: number,
    completed: boolean,
}

export interface IApplicationData {
    events?: Array<CalendarEvents>,
    searchedEvents?: Array<CalendarEvents>,
}

export const defaultState: IApplicationData = ({
    searchedEvents: [],
    events: eventsData
});

export default (state: IApplicationData = defaultState, {type, payload}: IApplicationActions): IApplicationData => {
    switch (type) {
        case actions.EVENT_CREATE:
            return {...state, events: [...state.events, payload.event]};
        case actions.EVENT_STATUS_UPDATE:
            return { ...state, events: state.events.map((event) => event.id === payload.id ? {...event, completed: payload.completed} : event)};
        case actions.EVENT_DELETE:
            return { ...state, events: state.events.filter((event) => event.id !== payload.id)};
        case actions.SEARCH_EVENTS:
            return { ...state, searchedEvents: payload.searchedEvents};
        default:
            return state;
    }
};
