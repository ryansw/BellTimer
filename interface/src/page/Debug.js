import React, { Component } from "react";
import testdata from "../testdata.json";

class Player extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.system === "test") this.data = testdata;
    this.update = this.update.bind(this);
    this.updateinteval = 0;
    this.dispdata = {
      daytype: "Regular Day",
      eventrem: "First Period Starts",
      timerem: "15:23",
      eventat: "First Period Starts at",
      timeat: "07:20:00",
      curtimet: "Current Time",
      curtime: "18:00:00"
    };
  }

  update = () => {
    console.log("Update called");
  };

  componentDidMount() {
    this.updateinteval = setInterval(this.update, 200);
  }

  componentWillUnmount() {
    clearInterval(this.updateinteval);
  }

  render() {
    return (
      <div className="Debug">
        <b>{this.props.match.params.system}</b>
        <br />
        Herein goes the debugger! <br />
        this.data:
        <br />
        <div style={{ wordWrap: "break-word" }}>
          {" "}
          {JSON.stringify(this.data)}{" "}
        </div>
        this.dispdata:
        <br />
        <div style={{ wordWrap: "break-word" }}>
          {" "}
          {JSON.stringify(this.dispdata)}{" "}
        </div>
      </div>
    );
  }
}

export default Player;
