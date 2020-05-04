"use strict";

import * as React from "react";
import { History, Location } from "history";

import {appRouter} from "services/index";

interface ILayoutProps {
    location: Location,
    history: History,
}

export default class Layout extends React.Component<ILayoutProps> {

    render(): JSX.Element {
        const routes: any = appRouter();
        return (
            <div id="app">
                {routes}
            </div>
        );
    }
}
