import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function BarcodeScanner({ onScanSuccess }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "scanner",
      {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        supportedScanTypes: []
      },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScanSuccess(decodedText);
      },
      (error) => {
        // Ignore continuous scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return <div id="scanner" />;
}

export default BarcodeScanner;