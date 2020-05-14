"use strict";

import * as React from "react";

export default class PageNotFound extends React.PureComponent {

    componentDidMount(): void {
        document.title = "Page Not Found";
    };

    render(): JSX.Element {

        return (
            <div id="page-not-found">
                page not found
            </div>
        );
    }
}
