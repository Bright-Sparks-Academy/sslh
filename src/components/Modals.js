import React, { useState } from 'react';
import "./Modal.css";
import styled from "styled-components"; 

const ChangeInfoButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 11rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 4rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

const CourseOptionsButton = styled.button`
  background-color: lightgray;
  height: 1.8rem;
  width: 8rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin-top: 1.3rem;
  cursor: pointer;
`;

// Function that creates a modal for entering information, generally account info.
export const Modal = ({ field, textField }) => {
    const [clickModal, setClickModal] = useState(false);
    
    // Changes the state of clicking on the modal.
    const toggleModal = () => setClickModal(!clickModal);
    
    return (
        <>
            <ChangeInfoButton onClick={toggleModal} className="btn-modal">
                Change {field}
            </ChangeInfoButton>
            {clickModal && 
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <h1>Change {field}</h1>
                            <h4>Please enter your new {field} below</h4>
                            {textField}
                            <CloseButton className="close-modal" onClick={toggleModal}>Exit</CloseButton>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export const EditInfo = ({children}) => {
    const [clickModal, setClickModal] = useState(false);
    const toggleModal = () => setClickModal(!clickModal);

    return (
        <>
            <CourseOptionsButton onClick={toggleModal} className="btn-modal">
                Edit Info
            </CourseOptionsButton>
            {clickModal && 
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <h1>Edit Information</h1>
                            <h4>Please change the information you want to change below.</h4>
                            {children}
                            <CloseButton className="close-modal" onClick={toggleModal}>Close</CloseButton>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}