import React, { Component } from "react";
import testdata from "../testdata.json";
import "../styles/GridPlayer.css";

function ScaledText(props) {
  return (
    <div className="ScaledText">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360.96 358.98">
        <text>Save $500</text>
      </svg> */}
      <svg viewBox="0 0 250 75" preserveAspectRatio="xMinYMin meet">
        <rect
          x="1"
          y="1"
          width="50"
          height="50"
          style={{
            stroke: "#000",
            fill: "red"
          }}
        />
      </svg>
    </div>
  );
}

function NiceClock(props) {
  return (
    <div className="NiceClock">
      <div className="ClockTitle">
        {/* <ScaledText Text={props.Name} /> */}
        {/* Test */}
        {props.Name}
      </div>
      <div className="ClockBody">
        {/* <ScaledText Text={props.Time} /> */}
        {props.Time}
      </div>
    </div>
  );
}

class GridPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GridPlayer">
        <div className="Buttons">This is Buttons</div>
        <div className="DayType">This is Day Type</div>
        <div className="MainTime">
          <NiceClock Name="Test" Time="00:00" />
        </div>

        <div className="NextTime">
          <NiceClock Name="Next Event" Time="00:00" />
        </div>
        <div className="CurrentTime">
          <NiceClock Name="Current Time" Time="00:00" />
        </div>
      </div>
    );
  }
}

export default GridPlayer;
