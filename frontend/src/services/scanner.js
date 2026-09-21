import { Capacitor } from "@capacitor/core";
import {
    CapacitorBarcodeScanner,
    CapacitorBarcodeScannerTypeHint,
    CapacitorBarcodeScannerAndroidScanningLibrary,
    CapacitorBarcodeScannerCameraDirection,
} from "@capacitor/barcode-scanner";

export function shouldUseNativeScanner() {
    return Capacitor.isNativePlatform();
}

export async function scanNativeBarcode() {
    try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: CapacitorBarcodeScannerTypeHint.ALL,
            cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
            android: {
                scanningLibrary:
                    CapacitorBarcodeScannerAndroidScanningLibrary.MLKIT,
            },
        });


        const { ScanResult } = result;

        return ScanResult || null;
    } catch (err) {
        console.error("Barcode scan failed:", err);
        return null;
    }
}