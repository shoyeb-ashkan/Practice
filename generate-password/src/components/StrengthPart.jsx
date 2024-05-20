import React from "react";

const StrengthPart = ({ password = "" }) => {
  const getPasswordstrenght = () => {
    switch (password.length > 1) {
      case password.length < 4:
        return "Very Weak";
      case password.length < 8:
        return "Poor";
      case password.length < 12:
        return "Medium";
      case password.length < 16:
        return "Strong";
    }
    return;
  };


  const strength = getPasswordstrenght();
  if (!strength) return <React.Fragment />
  
  return (
    <div className="password-strength">
      Strength: <span style={{ fontWeight: "bold" }}>{strength}</span>
    </div>
  );
};

export default StrengthPart;
