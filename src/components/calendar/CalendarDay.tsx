"use strict";

import * as React from "react";
import styled from "styled-components"

import {EVENT_COLORS} from "configs/constants";

import {CalendarEvents} from "modules/application/ApplicationReducer";

import DayPopup from "./DayPopup"

interface ICalendarDayProps {
    className?: string;
    today: boolean;
    day: number;
    month: string;
    events: Array<CalendarEvents>;
    onDayPageOpen: () => void,
}

interface ICalendarDayState {
    showPopup: boolean;
}

const Container = styled.div<{ today: boolean; }>`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 14.2%;
    min-height: 100px;
    padding: 0 5px;
    background: ${props => props.today ? "#f1f1f1;" : "#FFF;"}
    border: 1px solid #eaeaea;
`;

const TodayNumber = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 14px;
    align-self: flex-end;
    color: #2d5376;
    cursor: pointer;
    &:hover {
      background-color: #eaeaea;
    }
`;

const EventTitleText = styled.div`
    text-align: left;
    font-size: 12px;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const EventTitleContainer: any = styled.div<{ color: number; }>`
    display: grid;
    align-items: center;
    height: 18px;
    margin: 5px 0 0 0;
    padding: 0 5px;
    background-color: ${props => `${EVENT_COLORS[props.color]};`}
    border-radius: 5px;
    box-shadow: 0px 1px 13px -5px ${props => `${EVENT_COLORS[props.color]}`};
`;

const ShowMoreButton = styled.div`
    color: #3c4043;
    font-weight: 700;
    margin: 8px 0 0 0;
    padding: 0 5px;
    text-align: left;
    font-size: 12px;
    cursor: pointer;
`;

export default class CalendarDay extends React.Component<ICalendarDayProps, ICalendarDayState> {
    state = {
        showPopup: false,
    };

    handlePopupToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState(prevState => ({
            showPopup: !prevState.showPopup
        }));
    };

    render(): JSX.Element {
        const { className, today, day, events, onDayPageOpen, month } = this.props;

        return (
            <Container onClick={onDayPageOpen} className={className} today={today}>
                <TodayNumber>{day}</TodayNumber>
                { events && events.length > 0 &&
                    events.slice(0, 2).map(event => {
                        return <EventTitleContainer key={event.id} color={event.color}>
                                    <EventTitleText>{event.title}</EventTitleText>
                               </EventTitleContainer>
                    })
                }
                {
                    events && events.length > 2 &&
                        <ShowMoreButton onClick={this.handlePopupToggle}>More...</ShowMoreButton>
                }
                {
                    this.state.showPopup && <DayPopup
                                                events={events}
                                                month={month}
                                                day={day}
                                                handlePopupToggle={this.handlePopupToggle}
                                            />
                }
            </Container>
        );
    }
}
