import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faMicrophone,
    faPhone,
    faAngleUp,
    faPlay,
    faClosedCaptioning,
    faDesktop,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

import "./CallPageFooter.scss";

const CallPageFooter = ({ isAudio,toggleAudio, disconnetCall ,playBack}) => {
    return (
        <div className="footer-item">
            <div className="left-item">
                <div className="icon-block">
                    Meeting Details
                    <FontAwesomeIcon className="icon" icon={faAngleUp} />
                </div>
            </div>
            <div className="center-item">
                <div className={`icon-block ${!isAudio ? "red-bg" : null}`}
                    onClick={() => toggleAudio(!isAudio)}>
                    <FontAwesomeIcon className="icon" icon={ isAudio ? faMicrophone : faMicrophoneSlash} />
                </div>
                <div className="icon-block">
                    <FontAwesomeIcon className="icon" icon={faVideo} />
                </div>
                <div className="icon-block" onClick = {playBack}>
                    <FontAwesomeIcon className="icon" icon={faPlay} />
                </div>
                <div className="icon-block" onClick = {disconnetCall}>
                    <FontAwesomeIcon className="icon red" icon={faPhone} />
                </div>
            </div>
            <div className=" right-item">
                <div className="icon-block">
                    <FontAwesomeIcon className="icon red" icon={faClosedCaptioning} />
                    <p className="title"> Turn on captions</p>
                </div>
            </div>
        </div>
    );
}

export default CallPageFooter;
