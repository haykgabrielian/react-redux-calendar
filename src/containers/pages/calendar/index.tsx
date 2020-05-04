"use strict";

import * as React from "react";
import * as moment from "moment";
import {connect} from "react-redux";
import { History } from 'history';
import styled from "styled-components";
import selector, {IStoreProps} from "services/selector";

import {attemptEventSearch} from "modules/application/ApplicationActions";

import {PAGE_NAME, WEEK_DAYS} from "configs/constants";

import Header from "components/calendar/Header"
import SideBar from "components/calendar/SideBar"
import CalendarDay from "components/calendar/CalendarDay"


interface ICalendarProps extends IStoreProps {
    attemptEventSearch: (query: string) => void,
    history: History,
}

interface ICalendarState {
    setOfDate: Array<moment.Moment>,
    currentDate: moment.Moment,

}

const selectorVariables = {
    application: {
        events: true,
        searchedEvents: true,
    }
};

const Container = styled.div`
    width: 100%;
    padding: 0 20px 20px;
    text-align: center;
`;

const CalendarContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const CalendarHeaderItem = styled.div`
    height: 30px;
    background: #2d5376;
    display: flex;
    flex: 1 1 14.2%;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: 1px solid #eaeaea;
`;

const CalendarContainer = styled.div`
    display: flex;
    justify-content: center;
`;


class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
    state = {
        currentDate: moment().date(1),
        setOfDate:[]
    };

    componentDidMount() {
        document.title = 'Calendar';
        this.handleCalendarCreate();
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevState.currentDate.format('YYYY/MM/DD') != this.state.currentDate.format('YYYY/MM/DD'))
        this.handleCalendarCreate();
    }

    isToday = date => {
        return moment().isSame(date, 'd')
    };

    currentMonth = date => {
        const current = moment(date);
        const monthNumber = current.clone().month();
        const setOfDate = [];

        while(current.month() === monthNumber) {
            setOfDate.push(current.clone());
            current.add(1, "day");
        }
        return setOfDate;
    };

    previousMonth = date => {
        const prev = moment(date);
        const dayOfWeek = prev.day();
        const setOfDate = [];
        prev.subtract(dayOfWeek + 1, 'day');

        for(let i = dayOfWeek; i> 0; i--) {
            setOfDate.push(prev.add(1, 'day').clone());
        }
        return setOfDate;
    };

    nextMonth = date => {
        const next = moment(date)
            .add(1, 'month')
            .subtract(1, 'day');
        const dayOfWeek = next.day();
        const setOfDate = [];

        for(let i = dayOfWeek; i< 6; i++) {
            setOfDate.push(next.add(1, 'day').clone())
        }
        return setOfDate;
    };

    handleCalendarCreate = () => {
        const current = this.currentMonth(this.state.currentDate);
        const prev = this.previousMonth(this.state.currentDate);
        const next = this.nextMonth(this.state.currentDate);

        const sum = [...[],...prev,...current,...next];
        this.setState({
            setOfDate: sum
        });
    };

    handleMonthChange = step => {
        let currentDate = this.state.currentDate.clone();
        if(step < 0) {
            currentDate.subtract(1, "month");
        } else {
            currentDate.add(1, "month");
        }
        this.setState({
            currentDate
        });
    };

    handleCalendarDayOpen = (dayId: number): void => {
        const {history} = this.props;
        history.push(`/calendar/${dayId}`);
    };

    render(): JSX.Element {
        const { events, searchedEvents, attemptEventSearch } = this.props;
        const completedEvents = events && events.filter(event => event.completed);

        return (
            <Container className="container">
                <Header
                    currentDate={this.state.currentDate}
                    handleMonthChange={this.handleMonthChange}
                    completedEvents={completedEvents ? completedEvents.length : 0}
                    allEvents={events ? events.length : 0}
                    handleEventsSearch={attemptEventSearch}
                    searchedEvents={searchedEvents}
                />
                <CalendarContainer>
                    <SideBar events={events} />
                    <CalendarContent>
                        {
                            WEEK_DAYS.map( weekDay => <CalendarHeaderItem key={weekDay}>{weekDay}</CalendarHeaderItem>)
                        }
                        {
                            this.state.setOfDate.map( day => {
                                const onDayPageOpen = () => this.handleCalendarDayOpen(day.format('YYYY-MM-DD'));
                                const specificEvents = events && events.filter(event => event.date === day.format('YYYY-MM-DD'));

                                return (
                                    <CalendarDay
                                        key={day.format('YYYY-MM-DD')}
                                        today={this.isToday(day)}
                                        month={day.format("MMMM")}
                                        day={day.format("D")}
                                        events={specificEvents}
                                        onDayPageOpen={onDayPageOpen}
                                    />
                                )
                            })
                        }
                    </CalendarContent>
                </CalendarContainer>
            </Container>
        );
    }
}

const mapStateToProps: any = state => selector(state, selectorVariables);

const mapDispatchToProps: any = dispatch => ({
    attemptEventSearch: (query: string) => dispatch(attemptEventSearch(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);