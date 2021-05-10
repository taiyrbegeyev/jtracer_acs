import axios from "axios";
import moment from "moment";
import React from "react";
import QrReader from "react-qr-reader";

export default function QRScanner({
  email,
  isGuest,
  phoneNumber,
  zipCode,
  checkOutTime,
  handleNext,
}) {
  const previewStyle = {
    height: 200,
    width: 200,
    marginBottom: "50px",
  };

  const handleScan = async (data) => {
    if (data) {
      try {
        const url = "/api/v1/checkIns";

        const payload = {
          eventId: data,
          endTime: moment(checkOutTime, "HH:mm").toISOString(),
          email: email,
          isGuest: isGuest,
        };

        if (isGuest) {
          payload.phoneNumber = phoneNumber;
          payload.zipCode = zipCode;
        }

        await axios.post(url, payload);
        handleNext();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QrReader delay={1000} style={previewStyle} onScan={handleScan} />
      </div>
    </React.Fragment>
  );
}
