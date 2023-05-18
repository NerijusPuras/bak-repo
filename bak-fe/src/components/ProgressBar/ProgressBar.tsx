import React from "react";
import "./ProgressBar.scss";
import { ProgressBarProps } from "./types";

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const barStyle = {
    width: `${percentage}%`,
  };

  return (
    <div className="progress-bar__background">
      <div className="progress-bar__bar" style={barStyle} />
    </div>
  );
};

export default React.memo(ProgressBar);
