import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

function BarcodeScanner({ onScanSuccess, closeScanner }) {

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {

    const startScanner = async () => {

      scannedRef.current = false;

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

        await new Promise((resolve) => {
          if (video.readyState >= 2) {
            resolve();
          } else {
            video.onloadeddata = resolve;
          }
        });

        await new Promise((resolve) => setTimeout(resolve, 300));

        const hints = new Map();

        hints.set(
          DecodeHintType.POSSIBLE_FORMATS,
          [
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E
          ]
        );

        const reader = new BrowserMultiFormatReader(hints);

        readerRef.current = reader;

        const scanStart = performance.now();

        reader.decodeFromVideoElement(video, (result) => {

          if (result && !scannedRef.current) {

            console.log(
              "Detected after",
              (performance.now() - scanStart).toFixed(0),
              "ms"
            );

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
          width: "100vw",
          height: "100vh",
          background: "#000",
          position: "relative",
          overflow: "hidden"
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            aspectRatio: "3 / 1",
            border: "3px solid #00ff88",
            borderRadius: "12px",
            pointerEvents: "none",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)"
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "90px",
            width: "100%",
            textAlign: "center",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            zIndex: 10
          }}
        >
          Align the barcode inside the frame
        </div>

        <button
          onClick={shutdownScanner}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 28px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          Stop Scanning
        </button>

      </div>

    </div>

  );

}

export default BarcodeScanner;