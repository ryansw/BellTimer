import React from "react";

let Datemark = props => {
  let color = "#000000";
  if (!props.current) color = "#aaaaaa";
  return (
    <div
      style={{
        color: color,
        width: 100,
        height: 100,
        cursor: "pointer",
        margin: 5,
        padding: 5,
        background: "#dddddd"
      }}
      onClick={() => {
        if (props.onClick) props.onClick(props.number, props.month);
      }}
    >
      {props.number}
      <div>{props.children}</div>
    </div>
  );
};

export default Datemark;
