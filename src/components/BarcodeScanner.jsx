import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {

    const startScanner = async () => {

      try {

        // Step 1: request any rear camera first (to unlock device labels)
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        // Step 2: list all cameras
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = devices.filter(
          d => d.kind === "videoinput"
        );

        // Step 3: keep only rear cameras
        const rearCameras = videoDevices.filter(device =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear") ||
          device.label.toLowerCase().includes("environment")
        );

        let selectedDeviceId;

        if (rearCameras.length > 0) {
          // choose the last rear camera (usually main lens)
          selectedDeviceId = rearCameras[rearCameras.length - 1].deviceId;
        } else {
          selectedDeviceId = videoDevices[0]?.deviceId;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedDeviceId }
          },
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

    return () => stopCamera();

  }, []);

  const stopCamera = () => {

    try {

      const video = videoRef.current;

      if (readerRef.current?.stopContinuousDecode) {
        readerRef.current.stopContinuousDecode();
      }

      readerRef.current = null;

      if (video) {
        video.pause();
      }

      if (streamRef.current) {

        streamRef.current.getTracks().forEach(track => track.stop());

        streamRef.current = null;

      }

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