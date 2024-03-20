import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

const SocketProvider = ({ children }) => {
  const [incommingCall, setIncommingCall] = useState({});

  const socket = useMemo(() => io("http://localhost:5000"), []);

  const handleCallfromUser = useCallback(({ offer, from, senderName }) => {
    setIncommingCall({
      from,
      senderName,
      offer,
    });

    setTimeout(() => {
      setIncommingCall({});
    }, 7000);
  }, []);

  useEffect(() => {
    socket.on("callUser", handleCallfromUser);

    return () => {
      socket.off("callUser", handleCallfromUser);
    };
  }, [socket, handleCallfromUser]);

  return (
    <SocketContext.Provider value={{ socket, incommingCall }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
