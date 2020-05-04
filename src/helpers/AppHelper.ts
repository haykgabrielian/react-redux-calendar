"use strict";

import {Store} from "redux";

import {appReducer, appSaga} from "services/index";
import storeCreator from "helpers/StoreHelper";

export interface IAppConfigurations {
    store: Store<any>;
}

export function getAppConfigurations(): IAppConfigurations {
    let store: Store<any>;
    storeCreator.setParams(appReducer, appSaga);
    store = storeCreator.getStore();

    return {store};
}
