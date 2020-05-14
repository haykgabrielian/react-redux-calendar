"use strict";

import * as React from "react";
import styled,  { css } from "styled-components"

import {CalendarEvents} from "modules/application/ApplicationReducer";

interface ISideBarProps {
    handlePopupToggle: (e: React.MouseEvent<HTMLElement>) => void,
    className?: string;
    events: Array<CalendarEvents>;
    day: number;
    month: string;
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding:  10px;
    width: 160px;
    height: 190px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    z-index: 9;
    border: 2px solid #eaeaea;
    border-radius: 6px;
    overflow: auto;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 20px;
    -webkit-text-stroke: 3px white;
    cursor: pointer;
`;

const Month = styled.div`
    font-weight: 400;
    cursor: pointer;
    font-size: 14px;
    color: #70757a;
`;

const Day = styled.div`
    margin: 10px 0 0 0;
    font-weight: 400;
    cursor: pointer;
    font-size: 24px;
    letter-spacing: -2.6px;
    color: #70757a;
`;

const CheckIcon = styled.i`
    color: #78d97f;
    -webkit-text-stroke: 1px white;
`;

const IconContainer = styled.div`
    min-width: 25px;
`;

const TitleRow: any = styled.div<{ completed: boolean; }>`
    display: flex;
    align-content: flex-start;
    color: ${props => props.completed ? "#afafaf;" : "#2d5376;"}
    margin: 8px 0 0 0;
    min-height: 18px;
    width: 100%;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const DayPopup = (props: ISideBarProps) => {
    const { className, events, day, month, handlePopupToggle } = props;
    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <Container onClick={preventDefault} className={className}>
            <CloseButton onClick={handlePopupToggle}>
                <i className="fa fa-times" aria-hidden="true"/>
            </CloseButton>
            <Month>{month}</Month>
            <Day>{day}</Day>
            {
                events.map(event => <TitleRow key={event.id} completed={event.completed}>
                    <IconContainer>
                        {event.completed && <CheckIcon className="fa fa-check" aria-hidden="true"/>}
                    </IconContainer>
                    {event.title}
                </TitleRow>)}
        </Container>
    )
};

export default DayPopup
