import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ ticketId }) => {
  if (!ticketId) {
    return <div>Error: No ticket available for generating QR code.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Your Ticket QR Code</h2>
      <QRCodeCanvas value={ticketId} />
    </div>
  );
};

export default QRCodeGenerator;
