import React from "react";

const Notifications = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null;
  } else if (errorMessage !== "") {
    return <div className="errorMessage">{errorMessage}</div>;
  } else if (successMessage !== "") {
    return <div className="successMessage">{successMessage}</div>;
  }
  return null;
};

export default Notifications;
