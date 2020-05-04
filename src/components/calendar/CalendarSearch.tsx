"use strict";

import * as React from "react";
import styled from "styled-components";

import {CalendarEvents} from "modules/application/ApplicationReducer";
import {EVENT_COLORS} from "configs/constants";

interface ICalendarSearchProps  {
    searchedEvents: Array<CalendarEvents>;
    handleEventsSearch: (query: string) => void,
}

interface ICalendarSearchState {

}

const SearchContainer = styled.div`
    position: relative;
    margin: 0 0 0 30px;
`;

const StyledUl = styled.ul`
    position: absolute;
    top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 300px;
    background: #fff;
    z-index: 9;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const StyledInput = styled.input`
    width: 260px;
    border: 0;
    border: 1px solid #eaeaea;
    font-size: 14px;
    color: #2d5376;
`;

const EventRow: any = styled.li<{ color: number; }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 5px 0;
    width: 100%;
    color: #2d5376;
    border-top: 1px solid #eaeaea;
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

export default class CalendarSearch extends React.PureComponent<ICalendarSearchProps, ICalendarSearchState> {

    handleSearchChange = (e) => {
        const { handleEventsSearch } = this.props;
        handleEventsSearch(e.target.value)
    };

    render(): JSX.Element {
        const { searchedEvents } = this.props;
        return (
            <SearchContainer>
                <StyledInput placeholder="Search" type="text" onChange={this.handleSearchChange}/>
                <StyledUl>
                    {
                        searchedEvents != null &&
                        searchedEvents.map( event =>
                            <EventRow key={event.id}>
                                <EventRowColor color={event.color}/>
                                <TitleRow>
                                    <Title>{event.title}</Title>
                                    <Status>
                                        <IconContainer>
                                            {event.completed && <CheckIcon className="fa fa-check" aria-hidden="true"/>}
                                        </IconContainer>
                                        <StatusText completed={event.completed}>{event.completed ? "Completed" : 'Open'}</StatusText>
                                    </Status>
                                </TitleRow>
                                <Description>{event.description}</Description>
                            </EventRow>
                        )

                    }
                </StyledUl>
            </SearchContainer>
        );
    }
}
