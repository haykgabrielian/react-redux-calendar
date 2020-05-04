"use strict";

import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";

import "assets/css/app.css";
import "assets/css/font.css";

import {getAppConfigurations} from "helpers/AppHelper";
import Layout from "containers/Layout";

const {store} = getAppConfigurations();

const layout: any = (props) => <Layout {...props}/>;
const App: any = (
    <Provider store={store}>
        <BrowserRouter>
            <Route render={layout}/>
        </BrowserRouter>
    </Provider>
);

render(App, document.getElementById("root"));
