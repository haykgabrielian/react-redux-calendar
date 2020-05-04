"use strict";

import storeCreator from "helpers/StoreHelper";
import selector from "services/selector";
import {Store} from "redux";

import {put, takeLatest} from "redux-saga/effects";

import {eventSearch} from "./ApplicationActions";

import {actions} from "modules/application/ApplicationReducer";


function* attemptEventSearch({payload: {query}}: any) {
    const store: Store<any> = storeCreator.getStore();
    const {events} = selector(store.getState(), {application: { events: true }});

    const searchedEvents = query ? events && events.filter(event => event.title.toLowerCase().includes(query)) : [];

    yield put(eventSearch(searchedEvents));
}

function* applicationSaga() {
    yield takeLatest(actions.ATTEMPT_SEARCH_EVENTS, attemptEventSearch);
}

export default applicationSaga;
