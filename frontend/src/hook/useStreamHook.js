import { useEffect, useState } from "react";

const useCreateStream = () => {
  const [stream, setStream] = useState();

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);
    })();
  }, []);

  return { stream };
};

export default useCreateStream;
