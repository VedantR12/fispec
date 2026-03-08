import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {

    const codeReader = new BrowserMultiFormatReader();
    readerRef.current = codeReader;

    const startScanner = async () => {
      try {

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (!devices.length) {
          console.log("No cameras found");
          return;
        }

        // Prefer back camera
        let selectedCamera = devices[0].deviceId;

        for (const device of devices) {
          if (device.label.toLowerCase().includes("back")) {
            selectedCamera = device.deviceId;
            break;
          }
        }

        codeReader.decodeFromVideoDevice(
          selectedCamera,
          videoRef.current,
          (result, err) => {

            if (result) {
              onScanSuccess(result.getText());
              stopScanner();
            }

          }
        );

      } catch (error) {
        console.log("Scanner error:", error);
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };

  }, []);


  const stopScanner = () => {
    if (readerRef.current) {
      readerRef.current.reset();
    }
    closeScanner();
  };


  return (

    <div
      onClick={stopScanner}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
          style={{
            width: "100%",
            borderRadius: "8px"
          }}
        />

        <button
          onClick={stopScanner}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px"
          }}
        >
          Stop Scanning
        </button>

      </div>

    </div>

  );
}

export default BarcodeScanner;