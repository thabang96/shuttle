import React from "react";
import QrScanner from "react-qr-scanner";

const QRCodeGenerator = () => {
  const handleScan = (data) => {
    if (data) {
      console.log(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};

export default QRCodeGenerator;
