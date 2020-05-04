"use strict";

import * as React from "react";
import styled from "styled-components"

import {EVENT_COLORS} from "configs/constants";

import {CalendarEvents} from "modules/application/ApplicationReducer";

interface ISideBarProps {
    className?: string;
    events: Array<CalendarEvents>;
}

const SideBarContainer = styled.div`
   margin: 0 20px 0 0;
   min-width: 260px;
   max-width: 300px;
   height: fit-content;
   border: 1px solid #eaeaea;
`;

const EventRow: any = styled.div<{ color: number; }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 5px 0;
    width: 100%;
    color: #2d5376;
    border-radius: 5px;
    height: 60px;
    border-bottom: 1px solid #eaeaea;
`;

const EventRowColor: any = styled.div<{ color: number; }>`
     position: absolute;
     left: 0;
     top: 0;
     background-color: ${props => `${EVENT_COLORS[props.color]};`}}
     width: 6px;
     height: 100%;
`;

const SideBarTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    background-color: #2d5376;
    color: #fff;
`;

const EventsList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    
`;

const Title = styled.div`
    width: 100%;
    padding: 0 15px 0 0;
    margin: 0 0 0 10px;
    font-size: 16px;
    text-align: left;
    color: #2d5376;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Status = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px 0 auto;
`;

const StatusText: any = styled.div<{ completed: boolean; }>`
    font-size: 12px;
    color: ${props => props.completed ? '#afafaf;' : '#2d5376;'}
`;

const TitleRow = styled.div`
    display: flex;
    width: 100%;
`;

const CheckIcon = styled.i`
    color: #78d97f;
    -webkit-text-stroke: 1px white;
`;

const IconContainer = styled.div`
    min-width: 25px;
`;

const Description = styled.div`
    width: 100%;
    padding: 0 15px 0 0;
    margin: 12px 0 0 10px;
    text-align: left;
    font-size: 12px;
    color: #afafaf;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    
`;

export default function SideBar(props: ISideBarProps) {
    const { className, events } = props;

    const todayEvents = events && events.filter(event => {
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1,

              day = event.date.split('-')[2],
              month = event.date.split('-')[1];
        console.log();
        return (currentDay === +day && +month == currentMonth) ;
    });

    return (
        <SideBarContainer className={className}>
            <SideBarTitle>Today's Agenda</SideBarTitle>
            <EventsList>
                {todayEvents && todayEvents.length > 0 &&
                    todayEvents.map( event => {
                        const { title, description, id } = event;
                        return (
                            <EventRow key={id}>
                                <EventRowColor color={event.color}/>
                                <TitleRow>
                                    <Title>{title}</Title>
                                    <Status>
                                        <IconContainer>
                                            {event.completed && <CheckIcon className="fa fa-check" aria-hidden="true"/>}
                                        </IconContainer>
                                        <StatusText completed={event.completed}>{event.completed ? "Completed" : 'Open'}</StatusText>
                                    </Status>
                                </TitleRow>
                                <Description>{description}</Description>
                            </EventRow>
                        )
                    })
                }
            </EventsList>
        </SideBarContainer>
    )
}

