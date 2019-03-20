import React, { Component } from "react";
import pinkie from "../graphics/pinkie-confused.png";

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        How'd you get here?
        <br />
        <img src={pinkie} alt="Pinkie Pie Confused" height="200" />
      </div>
    );
  }
}

export default NotFound;
