"use strict";

import * as React from "react";
import styled from "styled-components"

import {CalendarEvents} from "modules/application/ApplicationReducer";

interface IAddEventPopUpProps {
    date: string,
    handlePopupClose: () => void,
    eventCreate: (event: CalendarEvents) => void,
}

interface IAddEventPopUpState {
    selectedOption: number,
    error: boolean,
    event: {
        title: string,
        description: string,
    },
}

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #0000003b;
    z-index: 99;
`;

const PopupContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 400px;
    height: 400px;
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
`;

const Title = styled.div`
    font-size: 16px;
    color: #2d5376;
`;

const AddForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const StyledInput = styled.input`
    margin: 50px 0 0 0;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #2d5376;
    font-size: 14px;
    color: #2d5376;
`;

const StyledTextarea = styled.textarea`
    margin: 20px 0 0 0;
    width: 100%;
    height: 100px;
    border: 1px solid #2d5376;
    font-size: 14px;
    color: #2d5376;
    resize: none;
    overflow: auto;
`;

const StyledInputRadio = styled.input`
    width: 15px;
    height: 15px;
    -webkit-appearance: checkbox;
`;

const RadioContainer = styled.div`
    display: flex;
`;

const RadioItem = styled.div`
    display: flex;
    margin: 10px 20px 0 0;
`;

const RadioTitle = styled.div`
    font-size: 12px;
    color: #2d5376;
    margin: 20px 0 0 0;
`;

const RadioColor1 = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    background-color: #80daff;
`;

const RadioColor2 = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    background-color: #78d97f;
`;

const RadioColor3 = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    background-color: #a294fb;
`;

const RadioColor4 = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    background-color: #ff7e7f;
`;

const FormButtons = styled.div`
    display: flex;
    margin: auto 0 0 auto;
`;

const StyledAddButton = styled.div`
    cursor: pointer;
    margin: 0 0 0 20px;
`;

const StyledCloseButton = styled.div`
    cursor: pointer;
    font-weight: 100;
    color: #ff7e7f;
`;

const ErrorMessage = styled.div`
    width: 100%;
    margin: 40px 0 0 0;
    text-align: center;
    font-size: 16px;
    color: #fa7e7f;
`;

export default class AddEventPopUp extends React.Component<IAddEventPopUpProps, IAddEventPopUpState> {
    state = {
        selectedOption: 1,
        error: false,
        event: {
            title: "",
            description: "",
        },
    };

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value;
        if (value.trim() === "") {
            this.setState(previousState => ({
                error: true,
                event: {
                    ...previousState.event,
                    [key]: value,
                },
            }));
        } else {
            this.setState(previousState => ({
                error: false,
                event: {
                    ...previousState.event,
                    [key]: value,
                },
            }));
        }
    };

    handleEventAdd = () => {
        const { event: { title, description }, selectedOption } = this.state;
        if (title === "" || description === "") {
            this.setState({ error: true });
            return;
        }
        const id = Date.now();

        const event = {
            id,
            date: this.props.date,
            title,
            description,
            color: selectedOption,
            completed: false,
        };
        this.props.eventCreate(event);
        this.props.handlePopupClose();
    };

    render(): JSX.Element {
        const { handlePopupClose, date } = this.props;
        const { event: { title, description }, error } = this.state;
        return (
            <PopupContainer>
                <PopupContent>
                    <Title>{`Add New Event for ${date}`}</Title>
                    <AddForm>
                        <StyledInput onChange={this.handleChange} value={title} placeholder="Title" type="text" name="title" autoFocus />
                        <StyledTextarea onChange={this.handleChange} value={description} placeholder="Description" name="description" />
                        <RadioTitle>Color</RadioTitle>
                        <RadioContainer>
                            <RadioItem>
                                <StyledInputRadio type="radio" value={1}
                                                  checked={this.state.selectedOption === 1}
                                                  onChange={this.handleOptionChange}/>
                                <RadioColor1/>
                            </RadioItem>
                            <RadioItem>
                                <StyledInputRadio type="radio" value={2}
                                                  checked={this.state.selectedOption === 2}
                                                  onChange={this.handleOptionChange} />
                                <RadioColor2/>
                            </RadioItem>
                            <RadioItem>
                                <StyledInputRadio type="radio" value={3}
                                                  checked={this.state.selectedOption === 3}
                                                  onChange={this.handleOptionChange} />
                                <RadioColor3/>
                            </RadioItem>
                            <RadioItem>
                                <StyledInputRadio type="radio" value={4}
                                                  checked={this.state.selectedOption === 4}
                                                  onChange={this.handleOptionChange} />
                                <RadioColor4/>
                            </RadioItem>
                        </RadioContainer>
                        <ErrorMessage>{error && "Please complete form to create Event"}</ErrorMessage>
                        <FormButtons>
                            <StyledCloseButton onClick={handlePopupClose}>Close</StyledCloseButton>
                            <StyledAddButton onClick={this.handleEventAdd}>Add</StyledAddButton>
                        </FormButtons>
                    </AddForm>
                </PopupContent>
            </PopupContainer>
        );
    }
}
