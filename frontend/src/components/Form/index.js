import CopyToClipboard from "react-copy-to-clipboard";
import { IoMdClipboard, IoIosCall } from "react-icons/io";
import { Button, Input, Alert, AlertIcon } from "@chakra-ui/react";

const Form = ({
  myMeetingId,
  socketId,
  handleClick,
  callUser,
  handleUserMeetingId,
  handleSetName,
  callAccepted,
  callEnded,
  leaveCall,
}) => {
  return (
    <div className="inner_form">
      <label className="label">Name</label>
      <Input
        className="input"
        onChange={(e) => handleSetName(e.target.value)}
        placeholder="Enter your name"
      />
      {myMeetingId && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {myMeetingId}
        </Alert>
      )}
      <CopyToClipboard text={socketId} style={{ marginTop: "2rem" }}>
        <Button
          colorScheme="blue"
          onClick={handleClick}
          leftIcon={<IoMdClipboard />}
        >
          Your Meeting ID
        </Button>
      </CopyToClipboard>
      <div style={{ marginTop: "2rem" }}>
        <label className="label">Meeting ID</label>
        <Input
          required
          className="input"
          placeholder="Enter Caller Meeting ID"
          onChange={(e) => handleUserMeetingId(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        {callAccepted && !callEnded ? (
          <Button
            colorScheme="red"
            onClick={leaveCall}
            style={{ padding: "1.5rem" }}
            leftIcon={<IoIosCall />}
          >
            End Call
          </Button>
        ) : (
          <Button
            colorScheme="green"
            onClick={callUser}
            style={{ padding: "1.5rem" }}
            leftIcon={<IoIosCall />}
          >
            Call 
          </Button>
        )}
      </div>
    </div>
  );
};
export default Form;
