import React from "react";
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import Meeting from "../assets/Meeting.png";
import videoconference from "../assets/videoconference.png";
import schedule from "../assets/schedule.png";
import Header from "../components/Header";

function Dashboard() {
    useAuth();
    const navigate = useNavigate();

    return (
        <>
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Header />
          <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            style={{ margin: "5vh 10vw" }}
          >
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={videoconference} alt="icon" size="5rem" />}
                title={`Create Meeting`}
                description="Create a new meeting and invite people."
                onClick={() => navigate("/create")}
                // changed that route to the 1 on 1 meeting route immediately
                paddingSize="xl"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={Meeting} alt="icon" size="50%" />}
                title={`My Meetings`}
                description="View your created meetings."
                onClick={() => navigate("/mymeetings")}
                paddingSize="xl"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={schedule} alt="icon" size="5rem" />}
                title={`Meetings`}
                description="View the meetings that you are invited to."
                onClick={() => navigate("/meetings")}
                paddingSize="xl"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </>
    )
}

export default Dashboard;