import React, { useEffect, useState } from "react";

const Progressbar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);
  const [max, setMax] = useState(0)

  useEffect(() => {
    setPercent(Math.min(Math.max(value, 0), 100));
    setMax(percent/100)

    if (value >= 100) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="progressbar">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>

      <div
        // style={{width: `${percent}%`}}
        style={{
            transform: `scaleX(${max})`,
            transformOrigin: "left"}}
      />
    </div>
  );
};

export default Progressbar;
