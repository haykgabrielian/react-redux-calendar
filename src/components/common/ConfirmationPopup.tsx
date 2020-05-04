"use strict";

import * as React from "react";
import styled from "styled-components"

interface IAddEventPopUpProps {
    handlePopupClose: () => void,
    handlePopupConfirm: () => void,
    title: string,
    description: string,

}

interface IAddEventPopUpState {

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
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 400px;
    min-height: 120px;
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #2d5376;
`;

const Description = styled.div`
    margin: 10px 0 0 0;
    font-size: 16px;
    color: #2d5376;
`;

const FormButtons = styled.div`
    display: flex;
    margin: auto 0 0 auto;
`;

const StyledConfirmButton = styled.div`
    cursor: pointer;
    margin: 0 0 0 20px;
`;

const StyledCloseButton = styled.div`
    cursor: pointer;
    font-weight: 100;
    color: #ff7e7f;
`;


export default class ConfirmationPopup extends React.Component<IAddEventPopUpProps, IAddEventPopUpState> {

    render(): JSX.Element {
        const { handlePopupConfirm, handlePopupClose, title, description } = this.props;
        const {  } = this.state;
        return (
            <PopupContainer>
                <PopupContent>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                        <FormButtons>
                            <StyledCloseButton onClick={handlePopupClose}>Close</StyledCloseButton>
                            <StyledConfirmButton onClick={handlePopupConfirm}>Confirm</StyledConfirmButton>
                        </FormButtons>
                </PopupContent>
            </PopupContainer>
        );
    }
}
