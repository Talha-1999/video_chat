import React, { useState, useEffect } from "react";

const MicrophonePlayer = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio context
    const initAudioContext = async () => {
      try {
        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(audioCtx);
      } catch (error) {
        console.error("Error initializing AudioContext:", error);
      }
    };

    initAudioContext();

    return () => {
      // Cleanup
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []); // Run only once on component mount

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(audioContext.destination);

      setIsPlaying(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    setIsPlaying(false);
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <button onClick={isPlaying ? handleStopRecording : handleStartRecording}>
        {isPlaying ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default MicrophonePlayer;
