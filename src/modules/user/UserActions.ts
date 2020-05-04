"use strict";

import {actions} from "./UserReducer";

export interface IUserActions {
    type: string;
    payload?: {
        userName?: string,
    };
}

export function attemptLogIn(userName: string): IUserActions {
    return {type: actions.ATTEMPT_LOG_IN, payload: {userName}};
}

export function logIn(userName: string): IUserActions {
    return {type: actions.LOG_IN, payload: {userName}};
}

