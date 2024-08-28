import React, { useState } from "react";
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
  margin: 0.2rem;
  cursor: pointer;
`;

const ViewButton = styled.button`
  background-color: black;
  color: white;
  height: 1.5rem;
  width: 8rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  overflow-y: scroll;
  height: 6rem;
  width: 14rem;
  border-radius: 1rem;
  direction: ltr;
  background-color: lightgray;
`;

const Message = styled.div`
  height: 3rem;
  width: 10rem;
  overflow-x: scroll;
  border-radius: 1rem;
  direction: ltr;
  background-color: lightgray;
`;

const CalendlyLinkButton = styled.button`
  background-color: lightgray;
  height: 2rem;
  width: 2rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  margin-left: 2rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const DeleteMeetingButton = styled.button`
  background-color: lightgray;
  height: 1.8rem;
  width: 12rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0.2rem;
  cursor: pointer;
`;

//Function that creates the modal to store the modal content for better reusability.
export const ModalContent = ({ children }) => {
  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};

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
      {clickModal && (
        <ModalContent>
          <h1>Change {field}</h1>
          <h4>Please enter your new {field} below</h4>
          {textField}
          <CloseButton className="close-modal" onClick={toggleModal}>
            Exit
          </CloseButton>
        </ModalContent>
      )}
    </>
  );
};

//Function that edits the account information for the BrightSparks user.
export const EditInfo = ({ children }) => {
  const [clickModal, setClickModal] = useState(false);
  const toggleModal = () => setClickModal(!clickModal);

  return (
    <>
      <CourseOptionsButton onClick={toggleModal} className="btn-modal">
        Edit Info
      </CourseOptionsButton>
      {clickModal && (
        <ModalContent>
          <h1>Edit Information</h1>
          <h4>Please change the information you want to change below.</h4>
          {children}
          <CloseButton className="close-modal" onClick={toggleModal}>
            Close
          </CloseButton>
        </ModalContent>
      )}
    </>
  );
};

export const LogSessionsMenu = ({ children }) => {
  const [clickModal, setClickModal] = useState(false);
  const toggleModal = () => setClickModal(!clickModal);
  return (
    <>
      <CalendlyLinkButton onClick={toggleModal}>+</CalendlyLinkButton>
      {clickModal && (
        <ModalContent>
          <h1>Log a Meeting</h1>
          <h4>Please enter the following fields to log a meeting.</h4>
          <h5>
            <i>
              Please log a meeting before the next day, otherwise the meeting
              will be invalid!
            </i>
          </h5>
          {children}
          <CloseButton className="close-modal" onClick={toggleModal}>
            Close
          </CloseButton>
        </ModalContent>
      )}
    </>
  );
};

export const ViewAccount = ({ children }) => {
  const [clickModal, setClickModal] = useState(false);
  const toggleModal = () => setClickModal(!clickModal);
  return (
    <>
      <ViewButton onClick={toggleModal}>View</ViewButton>
      {clickModal && (
        <div className="modal">
          <div className="overlay">{children}</div>
        </div>
      )}
    </>
  );
};

//Method that creates a new window for deleting meetings from the admin Logged Meetings Page.
export const DeleteMeetingWindow = () => {
  const [clickModal, setClickModal] = useState(false);
  const toggleModal = () => setClickModal(!clickModal);
  return (
    <>
      <DeleteMeetingButton
        style={{ width: "8rem", backgroundColor: "red", color: "white" }}
        onClick={toggleModal}
      >
        Delete Meeting
      </DeleteMeetingButton>
      {clickModal && (
        <div className="modal">
          <div className="overlay"></div>
        </div>
      )}
    </>
  );
};
