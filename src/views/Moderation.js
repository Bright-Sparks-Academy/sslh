import React from 'react'
import styled, { createGlobalStyle } from "styled-components";
import userIcon from "../assets/user.png";

const ModerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffaed;
  width: 99.4vw;
  height: 120vh;
`;

const ModerationTitle = styled.header`
  color: black;
  height: 3rem;
  width: 14rem;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 8rem 0 2rem 0;
`;

const SectionContainer = styled.div`
  display: grid;
  width: 93%;
  height: 80%;
  grid-template: 1fr 1.6fr/ 1fr 0.9fr 1.3fr;
  gap: 25px;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  border-radius: 1rem;
  background-color: #ffd900;
`;

const SectionHeader = styled.div`
  display: inline-block;
  font-weight: 650;
  font-size: 1.4rem;
  color: black;
  margin: 0.8rem 0 0.4rem 0.8rem;
`;

const WhiteBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-left: 1.5rem;
  border-radius: 1rem;
  height: 34rem;
  width: 88%;
`;

const ManageButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 4rem;
`;

const ManageButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  height: 2rem;
  width: 9.8rem;
  margin: 0 0.3rem 0 0.3rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  direction: rtl;
  border-radius: 1rem;
  width: 95%;
  height: 25rem;
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  width: 19.6rem;
  border-radius: 1rem;
  margin-top: 0.5rem;
  background-color: lightgray;
  direction: ltr;
`;

const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 33%;
`;

const UserIcon = styled.img`
  height: 3.6rem;
  width: 3.6rem;
  margin-left: 1rem;
`;

const AccountInfo = styled.span`
  display: block;
  font-size: 0.9rem;
  font-weight: 650;
`;

const ViewButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background-color: black;
  color: white;
  height: 1.7rem;
  width: 6rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const LetterGrade = styled.h1`
  margin: 0;
`;

const NumberGrade = styled.h4`
  margin: 0;
`;

const OptionsButtons = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  height: 1.5rem;
  width: 93%;
  margin: 0.5rem 0.3rem 0 0.3rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const SelectedAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 75%;
`;

const SelectedAccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 18rem;
`;

const InfoHeader = styled.div`
  margin: 1.5rem 0 0 2.5rem;
  width: 11rem;
  height: 1rem;
  font-weight: 700;
`;

const SelectedInfo = styled.div`
  margin: 0.6rem 0 0 4rem;
  width: 18rem;
  height: 1rem;
  font-weight: 650;
`;

const ContentPostsContainer = styled.div`
  display: grid;
  width: 100%;
  height: 35rem;
  gap: 1rem;
  grid-template: 1fr / 1fr 1fr;
`;

const ContentHeader = styled.header`
  margin: 0.5rem;
  font-size: 1.3rem;
  font-weight: 650;
`;

const ContentContainer = styled.div`
  width: 11rem;
  height: 3rem;
  border-radius: 1rem;
  direction: ltr;
  font-weight: 650;
  padding: 0.3rem 0 0 0.7rem;
  background-color: lightgray;
`;

const Content = styled.span`
  display: block;
`;


const Moderation = () => {
  return (
    <ModerationContainer>
      <ModerationTitle>Moderation</ModerationTitle>
      <SectionContainer>
        <Section style={{gridRow: 'span 2'}}>
          <SectionHeader>All Accounts</SectionHeader>
          <WhiteBackground>
            <ManageButtonContainer>
              <ManageButton style={{ backgroundColor: '#ffd900' }}>Managed Students</ManageButton>
              <ManageButton style={{ backgroundColor: 'black', color: 'white' }}>Managed Teachers</ManageButton>
            </ManageButtonContainer>
            <ScrollContainer>

              <AccountContainer>
                <ProfileSectionContainer>
                  <UserIcon src={userIcon} style={{ marginLeft: '0' }} alt='Profile'/>
                  <AccountInfo>Student A</AccountInfo>
                </ProfileSectionContainer>
                <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                  <AccountInfo>Class:</AccountInfo>
                  <AccountInfo>Assignments:</AccountInfo>
                  <AccountInfo>Joined:</AccountInfo>
                  <ViewButton>View</ViewButton>
                </ProfileSectionContainer>
                <ProfileSectionContainer>
                  <LetterGrade>A</LetterGrade>
                  <NumberGrade>99.28%</NumberGrade>
                </ProfileSectionContainer>
              </AccountContainer>

            </ScrollContainer>
            <OptionsButtons style={{ backgroundColor: '#ffffb0' }}>Select Account</OptionsButtons>
            <OptionsButtons style={{ backgroundColor: 'lightgray' }}>Admin Options</OptionsButtons>
          </WhiteBackground>
        </Section>

        <Section>
          <SectionHeader>Selected Account</SectionHeader>
          <SelectedAccountContainer>
            <AccountContainer>
              <ProfileSectionContainer>
                <UserIcon src={userIcon} style={{ marginLeft: '0' }} alt='Profile'/>
                <AccountInfo>Student A</AccountInfo>
              </ProfileSectionContainer>
              <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                <AccountInfo>Class:</AccountInfo>
                <AccountInfo>Assignments:</AccountInfo>
                <AccountInfo>Joined:</AccountInfo>
                <ViewButton>View</ViewButton>
              </ProfileSectionContainer>
              <ProfileSectionContainer>
                <LetterGrade>A</LetterGrade>
                <NumberGrade>99.28%</NumberGrade>
              </ProfileSectionContainer>
            </AccountContainer>

            <OptionsButtons style={{ backgroundColor: 'red', color: 'white' }}>Report Account</OptionsButtons>
            <OptionsButtons style={{ backgroundColor: 'lightgray' }}>Account Options</OptionsButtons>
          </SelectedAccountContainer>
        </Section>

        <Section style={{gridRow: 'span 2'}}>
          <SectionHeader>Account Content and Posts</SectionHeader>
          <ContentPostsContainer>
            <WhiteBackground>
              <ContentHeader>Recordings</ContentHeader>
              <ScrollContainer>
                <ContentContainer>
                  <Content>Recording 1: TITLE</Content>
                  <Content>6/22/24</Content>
                </ContentContainer>
              </ScrollContainer>
              <OptionsButtons style={{ backgroundColor: 'black', color: 'white' }}>View Content</OptionsButtons>
              <OptionsButtons style={{ backgroundColor: '#ffffb0' }}>Content Options</OptionsButtons>
              <OptionsButtons style={{ backgroundColor: 'red', color: 'white' }}>Report Content</OptionsButtons>
            </WhiteBackground>

            <WhiteBackground style={{ marginLeft: '0' }}>
              <ContentHeader>Messages</ContentHeader>
              <ScrollContainer>
                <ContentContainer>
                  <Content>Message 1: TITLE</Content>
                  <Content>6/22/24</Content>
                </ContentContainer>
              </ScrollContainer>
              <OptionsButtons style={{ backgroundColor: 'black', color: 'white' }}>View Content</OptionsButtons>
              <OptionsButtons style={{ backgroundColor: '#ffffb0' }}>Content Options</OptionsButtons>
              <OptionsButtons style={{ backgroundColor: 'red', color: 'white' }}>Report Content</OptionsButtons>
            </WhiteBackground>
          </ContentPostsContainer>
        </Section>

        <Section>
          <SectionHeader>Selected Account Information:</SectionHeader>
          <SelectedAccountInfoContainer>
            <InfoHeader>Personal Information:</InfoHeader>
            <SelectedInfo>Full Name:</SelectedInfo>
            <SelectedInfo>Preferred Pronouns:</SelectedInfo>
            <SelectedInfo>Phone Number:</SelectedInfo>

            <InfoHeader>Account Information:</InfoHeader>
            <SelectedInfo>User ID:</SelectedInfo>
            <SelectedInfo>Class:</SelectedInfo>
            <SelectedInfo>Last Joined:</SelectedInfo>
            <SelectedInfo>Email:</SelectedInfo>
          </SelectedAccountInfoContainer>
        </Section>
      </SectionContainer>
    </ModerationContainer>
  )
}

export default Moderation
