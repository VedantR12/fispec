import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {

    const startScanner = async () => {

      try {

        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (!devices.length) {
          console.log("No camera found");
          return;
        }

        let selectedCamera = devices[0].deviceId;

        // prefer back camera if possible
        for (const device of devices) {

          const label = device.label.toLowerCase();

          if (
            label.includes("back") ||
            label.includes("rear") ||
            label.includes("environment")
          ) {
            selectedCamera = device.deviceId;
            break;
          }

        }

        reader.decodeFromVideoDevice(
          selectedCamera,
          videoRef.current,
          (result) => {

            if (result) {

              const code = result.getText();

              shutdownScanner();

              onScanSuccess(code);

            }

          }
        );

        // capture stream for manual stop
        setTimeout(() => {
          if (videoRef.current) {
            streamRef.current = videoRef.current.srcObject;
          }
        }, 300);

      } catch (err) {

        console.log("Scanner error:", err);

      }

    };

    startScanner();

    return () => {
      shutdownScanner();
    };

  }, []);

  const shutdownScanner = () => {

    try {

      if (readerRef.current) {
        readerRef.current.reset();
      }

      if (streamRef.current) {

        const tracks = streamRef.current.getTracks();

        tracks.forEach(track => track.stop());

        streamRef.current = null;

      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

    } catch (e) {
      console.log("Scanner shutdown error:", e);
    }

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