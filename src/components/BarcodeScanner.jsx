import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {

    const startScanner = async () => {

      try {



        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment"
            },

            width: {
              ideal: 4096
            },

            height: {
              ideal: 2160
            },

            frameRate: {
              ideal: 30,
              max: 60
            }
          },

          audio: false
        });

        const track = stream.getVideoTracks()[0];

        const capabilities = track.getCapabilities();

        const advanced = [];

        if (capabilities.focusMode) {
          advanced.push({
            focusMode: "continuous"
          });
        }

        if (capabilities.exposureMode) {
          advanced.push({
            exposureMode: "continuous"
          });
        }

        if (capabilities.whiteBalanceMode) {
          advanced.push({
            whiteBalanceMode: "continuous"
          });
        }

        try {

          if (advanced.length > 0) {

            await track.applyConstraints({
              advanced
            });

          }

        }
        catch (e) {

          console.warn("Could not apply advanced constraints", e);

        }

        console.log("SETTINGS");
        console.log(track.getSettings());

        console.log("CAPABILITIES");
        console.log(capabilities);

        console.log("CONSTRAINTS");
        console.log(track.getConstraints());

        streamRef.current = stream;

        const video = videoRef.current;
        video.srcObject = stream;

        await video.play();

        await new Promise(resolve =>
          setTimeout(resolve, 500)
        );

        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        reader.decodeFromVideoElement(video, (result) => {

          if (result && !scannedRef.current) {

            scannedRef.current = true;

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