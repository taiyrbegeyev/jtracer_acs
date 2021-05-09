import React, { useState } from "react";
import QrReader from "react-qr-reader";

export default function QRScanner() {
  const [result, setResult] = useState("No Result");

  const previewStyle = {
    height: 200,
    width: 200,
    marginBottom: "50px",
  };

  const handleScan = (data) => {
    setResult(data);
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QrReader delay={100} style={previewStyle} onScan={handleScan} />
      </div>
    </React.Fragment>
  );
}
