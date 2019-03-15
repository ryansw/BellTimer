import React, { Component } from "react";
import testdata from "../testdata.json";

import styled from "styled-components";
const Wrap = styled.p`
  word-wrap: break-word;
`;

class Player extends Component {
  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "40px Monospace";
    this.ctx.fillText("Hello, World! (canvas!)", 0, 50);
  }

  render() {
    return (
      <div
        className="Player"
        style={{ padding: 0, margin: 0, overflow: "hidden" }}
      >
        <canvas
          ref="canvas"
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight - 50}
          style={{ padding: 0, margin: 0 }}
        />
      </div>
    );
  }
}

export default Player;
