import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator({ data }) {
  return (
    <div>
      <QRCode value={data} />
    </div>
  );
}

export default QRCodeGenerator;
