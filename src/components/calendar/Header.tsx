"use strict";

import * as React from "react";
import styled,  { css } from "styled-components"
import * as moment from "moment";

import {CalendarEvents} from "modules/application/ApplicationReducer";

import CalendarSearch from "./CalendarSearch";

interface IHeaderProps  {
    className?: string;
    completedEvents: number;
    allEvents: number;
    searchedEvents: Array<CalendarEvents>;
    currentDate: moment.Moment,
    handleMonthChange: (step: number) => void,
    handleEventsSearch: (query: string) => void,
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
`;

const HeaderNavigation = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const HeaderEventInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Date = styled.div`
    margin: 0 10px 0 0;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #eaeaea;
    }
`;

const RightIcon = styled.i`
    -webkit-text-stroke: 1px white;
`;

const LeftIcon = styled.i`
    -webkit-text-stroke: 1px white;
`;

export default class Header extends React.Component<IHeaderProps> {
    render(): JSX.Element {
        const { className, handleMonthChange, currentDate, allEvents, completedEvents, searchedEvents} = this.props;
        return (
            <HeaderContainer className={className}>
                <HeaderEventInfo>
                    <p>{`Total Events ${completedEvents}/${allEvents}`}</p>
                    <CalendarSearch handleEventsSearch={this.props.handleEventsSearch} searchedEvents={searchedEvents} />
                </HeaderEventInfo>
                <HeaderNavigation>
                    <Date>{currentDate.format("MMMM YYYY")} </Date>
                    <IconContainer onClick={() => handleMonthChange(-1)}>
                        <LeftIcon className="fa fa-chevron-left" aria-hidden="true"/>
                    </IconContainer>
                    <IconContainer onClick={() => handleMonthChange(1)}>
                         <RightIcon className="fa fa-chevron-right" aria-hidden="true"/>
                    </IconContainer>
                </HeaderNavigation>
            </HeaderContainer>
        );
    }
}
