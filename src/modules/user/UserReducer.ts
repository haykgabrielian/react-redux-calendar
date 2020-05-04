"use strict";

import {IUserActions} from "./UserActions";

interface IUserReducerActions {
    ATTEMPT_LOG_IN: string;
    LOG_IN: string;
}

export const actions: IUserReducerActions = {
    ATTEMPT_LOG_IN: "USER:ATTEMPT_LOG_IN",
    LOG_IN: "USER:LOG_IN",
};

export interface IUserData {
    userName: string;
}

export const defaultState: IUserData = {
    userName: "just button",
};

export default (state: IUserData = defaultState, {type, payload}: IUserActions): IUserData => {
    switch (type) {
        case actions.LOG_IN:
            return {...state, userName: payload.userName};
        default:
            return state;
    }
};
