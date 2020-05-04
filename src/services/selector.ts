"use strict";

import ApplicationSelector, {IApplicationModuleProps} from "modules/application/ApplicationSelector";
import UserSelector, {IUserModuleProps} from "modules/user/UserSelector";

export interface IStoreProps extends IUserModuleProps, IApplicationModuleProps {

}

export default (state, variables = null): any => {
    if (!variables) {
        return {
            ...UserSelector(state),
            ...ApplicationSelector(state),
        }
    } else {
        return {
            ...ApplicationSelector(state, variables.application),
            ...UserSelector(state, variables.user),
        }
    }
};
