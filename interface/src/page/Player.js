import React, { Component } from "react";
import testdata from "../testdata.json";

import styled from "styled-components";
const Wrap = styled.p`
  word-wrap: break-word;
`;

class Player extends Component {
  render() {
    return (
      <div className="Player">
        You are on <b>{this.props.match.params.system}</b>.<br />
        <pre>{JSON.stringify(this.props.match)}</pre>
        Here comes the part where I build a whole new player in...
      </div>
    );
  }
}

export default Player;
