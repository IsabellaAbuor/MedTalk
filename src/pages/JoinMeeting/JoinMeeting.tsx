import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseAuth, meetingsRef } from "../../utilis/FirebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import "./JoinMeeting.scss";
import CallPageHeader from "../../components/JoinMeetingComponents/CallPageHeader";
import CallPageFooter from "../../components/JoinMeetingComponents/CallPageFooter";
import CallPageInfo from "../../components/JoinMeetingComponents/CallPageInfo";
import Messenger from "../../components/JoinMeetingComponents/Messenger";

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === " Secure 1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          }
        } else navigate("/");
      }
    };

    getMeetingData();
  }, [params.id, userLoaded]);
 return (
  <div className="callpage-container">
    <video className="video-container" src="" controls></video>

    <CallPageHeader/>
    <CallPageFooter/>
    {/* <CallPageInfo/> */}
    {/* <Messenger/> */}


  </div>
 )
}