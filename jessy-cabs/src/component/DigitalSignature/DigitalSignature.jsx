import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./DigitalSignature.css";
import { APIURL } from "../url";

const DigitalSignature = () => {
  const apiUrl = APIURL;
  const sigCanvasRef = useRef(null);
  const tripId = new URLSearchParams(window.location.search).get("tripid");
  const uniqueno = new URLSearchParams(window.location.search).get(
    "uniqueNumber"
  );
  const [expired, setExpired] = useState(() => {
    const expiredInSessionStorage =
      sessionStorage.getItem("expired") && localStorage.getItem("expired");
    return expiredInSessionStorage
      ? JSON.parse(expiredInSessionStorage)
      : false;
  });

  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const saveSignature = async () => {
    const dataUrl = sigCanvasRef.current.toDataURL("image/png");

    try {
      await fetch(`http://${apiUrl}/api/saveSignaturewtid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signatureData: dataUrl,
          tripId: tripId,
          uniqueno: uniqueno,
        }),
      });
      clearSignature();
      setTimeout(() => {
        setExpired(true);
        sessionStorage.setItem("expired", true);
        localStorage.setItem("expired", true);
      }, 5000);
    } catch {
      setExpired(true);
    }
  };

  useEffect(() => {
    const expirationTimer = setTimeout(() => {
      setExpired(true);
      sessionStorage.setItem("expired", true);
      localStorage.setItem("expired", true);
    }, 30000);
    return () => clearTimeout(expirationTimer);
  }, []);

  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 500,
          className: "signature-canvas signature-pad ",
        }}
      />
      <div>
        <button className="clear-button" onClick={clearSignature}>
          Clear Signature
        </button>
        <button className="clear-button" onClick={saveSignature}>
          Done
        </button>
      </div>
    </div>
  );
};

export default DigitalSignature;
