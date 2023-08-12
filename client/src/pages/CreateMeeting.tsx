import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import React, { useState } from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUserField from "../components/FormComponents/MeetingUserField";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import { FieldErrorType, UserType } from "../utilis/types";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../utilis/FirebaseConfig";
// import { generatedMeetingId } from "../utilis/generatedMeetingId";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { nanoid } from "nanoid";
import { generateMeetingID } from "../utilis/generatedMeetingId";

export default function CreateMeeting() {

  useAuth();
  const [ users ] = useFetchUsers();
  const [ createToast ] = useToast();
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions:any) => {
    setSelectedUsers(selectedOptions);
  };

  const validateForm = () => {
    const clonedShowErrors = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true;
      clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      clonedShowErrors.meetingName.show = false;
      clonedShowErrors.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      //const meetingId: string = nanoid();
      
      await addDoc(meetingsRef, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: "Secure 1-on-1",
          invitedUsers: [selectedUsers[0].uid],
          meetingDate: startDate.format("L"),
          maxUsers: 1,
          status: true,
        });
        createToast({
          title: "One on One Meeting Created Successfully",
          type: "success",
        });
        navigate("/"); 
    }
  }
   
  return (
    <div
    style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <MeetingUserField 
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
          </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}