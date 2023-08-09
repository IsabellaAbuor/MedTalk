//import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useReducer, useRef, useState } from "react";
//import useToast from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
//import { firebaseAuth, meetingsRef } from "../../utilis/FirebaseConfig";
//import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import "./JoinMeeting.scss";
import CallPageHeader from "../../components/JoinMeetingComponents/CallPageHeader";
import CallPageFooter from "../../components/JoinMeetingComponents/CallPageFooter";
//import CallPageInfo from "../../components/JoinMeetingComponents/CallPageInfo";
import Messenger from "../../components/JoinMeetingComponents/Messenger";
import MessageListReducer from "../../app/reducers/MessageListReducer";
import Peer from "simple-peer";
import { getRequest, postRequest } from "../../utilis/apiRequests";
import io from "socket.io-client";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../../utilis/apiEndpoints";
import Alert from "../../components/JoinMeetingComponents/Alerts";

let peer = null;
const socket = io.connect("http://localhost:4000");
const initialState = [];

const JoinMeeting = () => {

  const navigate = useNavigate();

  let { id } = useParams();
  const isAdmin = window.location.hash == "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer, initialState);

  const [streamObj, setStreamObj] = useState(null);
  const [isAudio, setIsAudio] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [playBack, setPlayBack] = useState();

  const myVideo = useRef();

  useEffect(() => {
    if (isAdmin) {
      console.log("User is Administrator");
    }
    initWebRTC();
    socket.on("code", (data) => {
        if (data.url === url) {
      peer.signal(data);}
    });
  }, []);

  const getRecieverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    console.log(response);
    if (response.code) {
      peer.signal(response.code);
    }
    // if (response.data.code === 200) {
    //   socket.emit("code", {data: response.data.data}, (cbData) => {
    //     console.log("code sent");
    //   });
    // } else {
    //   createToast({
    //     title: response.data.message,
    //     type: "danger",
    //   });
    // }
  };

  const initWebRTC = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    .then((stream) => {
      setStreamObj(stream);
      
        myVideo.current.srcObject = stream;

        peer = new Peer({
          intiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getRecieverCode();
        }

        peer.on("signal", async (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });
          }
        });

        peer.on("connect", () => {
          //waiting for connection
          console.log("peer connected");
        })

        peer.on("data", (data) => {
          clearTimeout(alertTimeout);
          messageListReducer({
            type: "addMessage",
            payload: {
              user: "other",
              msg: data.toString(),
              time: Date.now(),
            },
          });
          setMessageAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: "other",
              msg: data.toString(),
            },
          });

          alertTimeout = setTimeout(() => {
            setMessageAlert({
              ...messageAlert,
              isPopup: false,
              payload: {},
            });
          }, 10000);
        });

        peer.on("stream", (stream) => {
          //getting the video stream
          let video = document.querySelector(".video");

          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }

          video.play();  
        })

      })
      .catch(() => {
        console.log("error");
      })

  };

  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disconnectCall = () => {
    peer.destroy();
    navigate("/");
    window.location.reload();
  };

  //  const playBack = () =>{
     
  //  }
  return (
    <div className="callpage-container">
      <video className="video-container" src="" controls></video>

      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
      />
      {/* <CallPageInfo/> */}
      {isMessenger ? (
      <Messenger
        setIsMessenger={setIsMessenger}
        sendMsg={sendMsg}
        messageList={messageList}
      />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  )
}
export default JoinMeeting;