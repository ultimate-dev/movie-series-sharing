import React from "react";

export default function Article({ children }) {
  const height = window.innerHeight;
  return (
    <div className="content" style={{ minHeight: height - 114 }}>
      {children}
    </div>
  );
}
