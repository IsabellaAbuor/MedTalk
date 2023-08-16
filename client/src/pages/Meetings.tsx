import React, { useEffect, useState } from "react";
import { EuiBadge, EuiBasicTable, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel } from "@elastic/eui";
import { MeetingType } from "../utilis/types";
import { useAppSelector } from "../app/hooks";
import { meetingsRef } from "../utilis/FirebaseConfig";
import { getDocs, query } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Meetings() {
  useAuth();
  const [meetings, setMeetings] = useState<any>([]);
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  
  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === userInfo?.uid)
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              (user: string) => user === userInfo?.uid
            );
            if (index !== -1) {
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);
  
  const columns = [{
    field:"meetingName",
    name:"Meeting Name",
  },
  // {
  //   field:"meetingType",
  //   name:"Meeting Type"
  // },
  {
    field:"meetingDate",
    name: "Meeting Date",
  },
  {
    field:"",
    name:"Status",
    render:(meeting:MeetingType)=>{
      if(meeting.status){
        if(meeting.meetingDate === moment().format("L")){
          return <EuiBadge color="success" >
          <Link to={`/join/${meeting.meetingId}`} style={{ color: "black" }} >
              Join Now
          </Link>
          </EuiBadge>
        } else if (
          moment(meeting.meetingDate).isBefore(moment().format("L"))
        ) {
          return <EuiBadge color="default">Ended</EuiBadge>;
        } else if (moment(meeting.meetingDate).isAfter()) {
          return <EuiBadge color="primary">Upcoming</EuiBadge>;
        }
      }else return <EuiBadge color ="danger"> Cancelled</EuiBadge>
    }
  },
  {
    field:"meetingId",
    name:"Copy Link",
    width: "5%",
    render:(meetingId:string) => {
      return(
        <EuiCopy
        textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
        >
          {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
        </EuiCopy> 
      )
    }
  },
];

  return (
    <div
    style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}
    >
    <Header />
      <EuiFlexGroup justifyContent="center"  style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
     </div>

  );
}
