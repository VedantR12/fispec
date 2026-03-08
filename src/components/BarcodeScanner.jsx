import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {

    const startScanner = async () => {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false
        });

        streamRef.current = stream;

        const video = videoRef.current;
        video.srcObject = stream;

        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        reader.decodeFromVideoElement(video, (result) => {

          if (result) {

            const code = result.getText();

            stopCamera();

            onScanSuccess(code);

          }

        });

      } catch (err) {

        console.error("Camera start error:", err);

      }

    };

    startScanner();

    // cleanup when component unmounts
    return () => stopCamera();

  }, []);

  const stopCamera = () => {

    try {

      const video = videoRef.current;

      // stop ZXing decoding if running
      if (readerRef.current?.stopContinuousDecode) {
        readerRef.current.stopContinuousDecode();
      }

      readerRef.current = null;

      // pause video
      if (video) {
        video.pause();
      }

      // stop camera stream tracks
      if (streamRef.current) {

        streamRef.current.getTracks().forEach(track => track.stop());

        streamRef.current = null;

      }

      // detach video
      if (video) {
        video.srcObject = null;
      }

    } catch (e) {

      console.error("Camera stop error:", e);

    }

  };

  const shutdownScanner = () => {

    stopCamera();

    closeScanner();

  };

  return (

    <div
      onClick={shutdownScanner}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "420px",
          background: "#000",
          padding: "20px",
          borderRadius: "10px"
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            borderRadius: "8px"
          }}
        />

        <button
          onClick={shutdownScanner}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          Stop Scanning
        </button>

      </div>

    </div>

  );

}

export default BarcodeScanner;