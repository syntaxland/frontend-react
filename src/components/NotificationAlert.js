// NotificationAlert.js
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const NotificationAlert = ({ variant, message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Alert variant={variant} show={show} onClose={handleClose} dismissible>
      <Alert.Heading>{variant === "danger" ? "Error" : "Notification"}</Alert.Heading>
      <p>{message}</p>
      <div className="d-flex justify-content-end">
        <Button onClick={handleClose} variant={`outline-${variant}`}>
          OK
        </Button>
      </div>
    </Alert>
  );
};

export default NotificationAlert;
