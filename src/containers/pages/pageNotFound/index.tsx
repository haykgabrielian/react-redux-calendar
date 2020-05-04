"use strict";

import * as React from "react";

interface IPageNotFoundProps {
}


interface IPageNotFoundState {
}

export default class PageNotFound extends React.PureComponent<IPageNotFoundProps, IPageNotFoundState> {

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

