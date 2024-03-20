import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PiPhoneCall, PiPhoneCallFill } from "react-icons/pi";
import { MdCallEnd } from "react-icons/md";

const CustomModal = ({ visible, CallerName, answerCall }) => {
  return (
    <>
      <Modal isOpen={visible}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} color={"green"}>
            {CallerName}
          </ModalHeader>
          <ModalBody>
            <p style={{ textAlign: "center", margin: 5 }}>Incomming call....</p>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PiPhoneCallFill size={"150px"} color="lightblue" />
              </div>
              <div style={{ padding: 20 }}>
                <Button
                  marginRight={"10"}
                  leftIcon={<MdCallEnd />}
                  colorScheme="red"
                />
                <Button
                  onClick={answerCall}
                  leftIcon={<PiPhoneCall />}
                  colorScheme="green"
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
