import React from "react";

const Button = ({customClassName, onClickhandler, title}) => {
  return (
    <React.Fragment>
      <button
        className={customClassName}
        onClick={onClickhandler
        }
      >
        {title}
      </button>
    </React.Fragment>
  );
};

export default Button;
