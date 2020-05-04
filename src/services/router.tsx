"use strict";

import * as React from "react"
import {Route, Switch} from "react-router-dom";

import {ROUTER_CONFIG} from "configs/routerConfig";

import Calendar from "containers/pages/Calendar";
import PageNotFound from "containers/pages/pageNotFound";
import CalendarDayPage from "containers/pages/calendar/CalendarDayPage";

const router: any = {
    root: {
        path: "/",
        component: Calendar
    },
    calendarDay: {
        path: "/calendar/:id",
        component: CalendarDayPage
    },
    init: {
        path: "*",
        component: PageNotFound
    },
};

const publicPages: any = (component: any, props?: any): any => {
    return React.createElement(component, props);
};

const routerInstance: any = [];
for (const item in router) {
    if (router.hasOwnProperty(item)) {
        const path: string = router[item].path;
        const component: any = router[item].component || null;
        const handleRender: any = (props: any): void => {
            return publicPages.call(null, component, props);
        };
        if (ROUTER_CONFIG[item]) {
            routerInstance.push(
                <Route
                    exact={true}
                    key={item}
                    path={path}
                    render={handleRender}
                />
            )
        }
    }
}

export default (): JSX.Element => {
    return (
        <Switch>
            {routerInstance}
        </Switch>
    )
};
