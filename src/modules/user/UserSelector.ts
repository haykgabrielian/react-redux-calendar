"use strict";

import {createSelector} from "helpers/DataHelper";

const userDataSelector: any = state => state.get("userData");

const successUserNameSelector: any = createSelector(
    userDataSelector, (userData: any) => userData.userName
);

export interface IUserModuleProps {
    userName?: string;
}

export default (state, variables = null) => {
    if (!variables) {
        return {
            userName: successUserNameSelector(state),
        }
    } else {
        return {
            userName: variables.userName ? successUserNameSelector(state) : null,
        }
    }
};

