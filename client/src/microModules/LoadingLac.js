import React from "react";
import lac from "./chim.gif";

export default () => {
  const loadingText = {
    margin: "auto",
    textAlign: "center",
    fontSize: "2rem"
  };
  return (
    <div style={{ width: "100%" }} className="mt-3 mb-3">
      <img
        src={lac}
        alt="Chờ Chút Nhé......"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
      <p style={loadingText} className="text-warning">
        họa mi đang ngừng hót....
      </p>
    </div>
  );
};
