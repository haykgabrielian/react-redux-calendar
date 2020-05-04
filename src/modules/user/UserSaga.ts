"use strict";
import {put, takeLatest} from "redux-saga/effects";

import {actions} from "./UserReducer";
import {logIn} from "./UserActions";

function* attemptLogIn({payload: {userName}}: any): any {
    console.log("SAGA");
    yield put(logIn(userName));
}

function* userSaga(): any {
    yield takeLatest(actions.ATTEMPT_LOG_IN, attemptLogIn);
}

export default userSaga;
