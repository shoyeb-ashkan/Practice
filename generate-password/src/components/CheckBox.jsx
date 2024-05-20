import React from "react";

const CheckBox = ({ title, checked, onChange }) => {
  return (
    
          <div>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <label onClick={onChange}>{title}</label>
          </div>
        );
     
};

export default CheckBox;
