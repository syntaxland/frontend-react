// import React from "react";
// import { Alert } from "react-bootstrap";

// function Message({ variant, children }) {
//   return <Alert variant={variant} >{children}</Alert>;
// }

// export default Message;


import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showMessage ? (
    // <div className={`alert alert-${variant} my-3`}>{children}</div>
    <div><Alert className="rounded" variant={variant} >{children}</Alert></div>
  ) : null;
};

export default Message;
