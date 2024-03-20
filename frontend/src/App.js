import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Peer from "simple-peer";
import "./App.css";

import useCreateStream from "./hook/useStreamHook";
import { useSocket } from "./context/socketContext";
import CustomModal from "./components/Modal";
import Form from "./components/Form";

const App = () => {
  const connectionRef = useRef();
  const [name, setName] = useState("");
  const [userVideo, setUserVideo] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const [myMeetingId, setMyMeetingId] = useState("");
  const [userMeetingId, setUserMeetingId] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);

  const { stream } = useCreateStream();
  const { socket, incommingCall } = useSocket();

  const handleClick = () => {
    setMyMeetingId("Copy Meeting ID");
    setTimeout(() => {
      setMyMeetingId("");
    }, 2000);
  };

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      // this params "data" is a offer to send other user
      socket.emit("callUser", {
        userId: userMeetingId,
        offer: data,
        senderName: name,
      });
    });

    peer.on("stream", (stream) => {
      // this is console when the user accept the call
      // it is client user video stream
      // console.log(stream, "caller stream");
      setUserVideo(stream);
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      // this params "data" is a answer to send caller user
      socket.emit("answerCall", { answer: data, to: incommingCall.from });
    });
    peer.on("stream", (stream) => {
      // it is caller user video stream
      setUserVideo(stream);
    });
    peer.signal(incommingCall.offer);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const handleSetName = (name) => {
    setName(name);
  };
  const handleUserMeetingId = (id) => {
    setUserMeetingId(id);
  };

  return (
    <>
      <h1>Zoom</h1>
      <div className="main">
        <div className="vedio_container">
          <div className="vedio_container_child">
            {stream && (
              <ReactPlayer
                style={{ borderRadius: "20px" }}
                url={stream}
                height={"100%"}
                width={"100%"}
                muted
                playing
              />
            )}
          </div>
          <div className="vedio_container_child">
            {callAccepted && !callEnded && (
              <ReactPlayer
                url={userVideo}
                height={"100%"}
                width={"100%"}
                muted
                playing
              />
            )}
          </div>
        </div>
        <div className="form_container">
          <Form
            myMeetingId={myMeetingId}
            socketId={socket.id}
            handleClick={handleClick}
            callUser={callUser}
            handleUserMeetingId={handleUserMeetingId}
            handleSetName={handleSetName}
            callAccepted={callAccepted}
            callEnded={callEnded}
            leaveCall={leaveCall}
          />
        </div>
        <CustomModal
          visible={
            Object.keys(incommingCall).length && !callAccepted ? true : false
          }
          CallerName={incommingCall?.senderName}
          answerCall={answerCall}
        />
      </div>
    </>
  );
};
export default App;
