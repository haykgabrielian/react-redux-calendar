"use strict";

import * as React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import selector, {IStoreProps} from "services/selector";

import {EVENT_COLORS} from "configs/constants";
import {History} from "history";

import {CalendarEvents} from "modules/application/ApplicationReducer";
import {eventCreate, eventStatusUpdate, eventDelete} from "modules/application/ApplicationActions";

import AddEventPopUp from "components/calendar/AddEventPopUp";
import ConfirmationPopup from "components/common/ConfirmationPopup"


interface ICalendarDayPageProps extends IStoreProps {
    eventCreate: (event: CalendarEvents) => void,
    eventStatusUpdate: (id: number, completed: boolean) => void,
    eventDelete: (id: number) => void,
    location: Location,
    history: History,
}

interface ICalendarDayPageState {
    addPopup: boolean,
    deletePopup: number
}

const selectorVariables = {
    application: {
        events: true
    }
};

const CalendarDayHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 40px;
    padding: 0 10px;
`;

const HeaderInfo = styled.div`
    margin: 0 auto 0 20px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-text-stroke: 3px #fff;
    &:hover {
      background-color: #eaeaea;
      -webkit-text-stroke: 3px #eaeaea;
    }
`;

const AddIcon = styled.i`
    color: #2d5376;
    cursor: pointer;
    font-size: 25px;
`;

const EventItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
`;

const DeleteAction = styled.i`
    position: absolute;
    right: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #78d97f;
    cursor: pointer;
`;

const BackAction = styled.i`
    color: #2d5376;
    cursor: pointer;
    font-size: 25px;
`;

const CompleteAction = styled.i`
    position: absolute;
    right: 20px;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #78d97f;
    cursor: pointer;
    -webkit-text-stroke: 1px white;
`;

const EventItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 15px 15px 0 0;
    padding: 12px 4px;
    width: 230px;
    height: 140px;
    border: 1px solid #eaeaea;
    &:hover {
        ${DeleteAction} {
            display: flex;
        }
        ${CompleteAction} {
            display: flex;
        }
    }
`;

const ItemColor: any = styled.div<{ color: number; }>`
     position: absolute;
     left: 0;
     top: 0;
     background-color: ${props => `${EVENT_COLORS[props.color]};`}}
     width: 100%;
     height: 6px;
`;

const Title = styled.div`
    width: 100%;
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
    align-items: center;
    width: 100%;
`;

const CheckIcon = styled.i`
    color: #78d97f;
    -webkit-text-stroke: 1px white;
`;

const Description = styled.div`
    display: -webkit-box;
    width: 100%;
    margin: 12px 0 0 0;
    text-align: left;
    font-size: 12px;
    color: #afafaf;
    text-overflow: ellipsis;
    overflow: hidden;
   -webkit-line-clamp: 4;
   -webkit-box-orient: vertical;
    
`;

class CalendarDayPage extends React.PureComponent<ICalendarDayPageProps, ICalendarDayPageState> {
    state = {
        addPopup: false,
        deletePopup: null,
    };

    componentWillMount(): void {
        document.title = 'Calendar';
    }

    handleDeletePopupShow = (id: number) => {
        this.setState({ deletePopup: id })
    };

    handleDeletePopupClose = () => {
        this.setState({ deletePopup: null })
    };

    handleAddPopupShow = () => {
        this.setState({ addPopup: true })
    };

    handleAddPopupClose = () => {
        this.setState({ addPopup: false })
    };

    handleEventStatusUpdate = (id: number) => {
        this.props.eventStatusUpdate(id, true);
    };

    handleEventDelete = (id: number) => {
        this.props.eventDelete(id);
        this.handleDeletePopupClose();
    };

    handleBackClick = () => {
        const {history} = this.props;
        history.push(`/`);
    };

    render(): JSX.Element {
        const { location: {pathname}, events, eventCreate } = this.props;
        const todayEvents = events && events.filter(item => pathname.includes(item.date));
        const date = pathname.substring(pathname.lastIndexOf('/') + 1);
        const handleEventDelete = () => this.handleEventDelete(this.state.deletePopup);
        return (
            <div>
                <CalendarDayHeader>
                    <IconContainer onClick={this.handleAddPopupShow}>
                        <BackAction onClick={this.handleBackClick} className="fa fa-arrow-left" aria-hidden="true"/>
                    </IconContainer>
                    <HeaderInfo>{`Total Tasks for ${date}`}</HeaderInfo>
                    <IconContainer onClick={this.handleAddPopupShow}>
                        <AddIcon className="fa fa-plus" aria-hidden="true"/>
                    </IconContainer>
                </CalendarDayHeader>
                <EventItemContainer>
                    {
                        todayEvents && todayEvents.length > 0 ?
                            (
                                todayEvents.map( day => {
                                    const onStatusUpdate = () => this.handleEventStatusUpdate(day.id);
                                    const onDeletePopupShow = () => this.handleDeletePopupShow(day.id);
                                    return (
                                        <EventItem key={day.id}>
                                            <DeleteAction onClick={onDeletePopupShow} className="fa fa-trash" aria-hidden="true"/>
                                            {!day.completed && <CompleteAction onClick={onStatusUpdate} className="fa fa-check" aria-hidden="true"/>}
                                            <ItemColor color={day.color}/>
                                            <TitleRow>
                                                <Title>{day.title}</Title>
                                                <Status>
                                                    <IconContainer>
                                                        {day.completed && <CheckIcon className="fa fa-check" aria-hidden="true"/>}
                                                    </IconContainer>
                                                    <StatusText completed={day.completed}>{day.completed ? "Completed" : 'Open'}</StatusText>
                                                </Status>
                                            </TitleRow>
                                            <Description>{day.description}</Description>
                                        </EventItem>
                                    )
                                })
                            ) :
                            <span>no events</span>
                    }
                </EventItemContainer>
                {
                    this.state.addPopup && <AddEventPopUp
                                                handlePopupClose={this.handleAddPopupClose}
                                                eventCreate={eventCreate}
                                                date={date}
                                            />
                }
                {
                    this.state.deletePopup != null && <ConfirmationPopup
                        handlePopupClose={this.handleDeletePopupClose}
                        handlePopupConfirm={handleEventDelete}
                        title='Delete'
                        description='Are you sure you want to delete?'
                    />
                }
            </div>
        );
    }
}

const mapStateToProps: any = state => selector(state, selectorVariables);

const mapDispatchToProps: any = dispatch => ({
    eventCreate: (event: CalendarEvents) => dispatch(eventCreate(event)),
    eventStatusUpdate: (id: number, completed: boolean) => dispatch(eventStatusUpdate(id, completed)),
    eventDelete: (id: number) => dispatch(eventDelete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayPage);