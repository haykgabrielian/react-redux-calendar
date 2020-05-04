"use strict";

import {actions, CalendarEvents} from "modules/application/ApplicationReducer";

export interface IApplicationActions {
    type: string;
    payload?: {
        completed?: boolean,
        id?: number,
        query?: string,
        event?: CalendarEvents,
        searchedEvents?: Array<CalendarEvents>,
    };
}

export function eventCreate(event: CalendarEvents): IApplicationActions {
    return {type: actions.EVENT_CREATE, payload: {event}};
}

export function eventStatusUpdate(id: number, completed: boolean): IApplicationActions {
    return {type: actions.EVENT_STATUS_UPDATE, payload: {id, completed}};
}

export function eventDelete(id: number): IApplicationActions {
    return {type: actions.EVENT_DELETE, payload: {id}};
}

export function eventSearch(searchedEvents: Array<CalendarEvents>): IApplicationActions {
    return {type: actions.SEARCH_EVENTS, payload: {searchedEvents}};
}

export function attemptEventSearch(query: string): IApplicationActions {
    return {type: actions.ATTEMPT_SEARCH_EVENTS, payload: {query}};
}