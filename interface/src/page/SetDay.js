import React, { Component } from "react";
import { Link } from "react-router-dom";

class SetDay extends Component {
  constructor(props) {
    super(props);
    let dateregex = /([0-9]{4})-([1-9]?[0-9])-([1-9]?[0-9])/;
    this.date = dateregex.exec(this.props.match.params.date);
    this.system = this.props.match.params.system;
    this.state = {
      valid: this.date !== null,
      dirty: false
    };
  }

  render() {
    if (!this.state.valid)
      return (
        <div>
          The date provided is invalid or improperly formatted.
          <br />
          <Link to={"/set/" + this.props.match.params.system}>
            Click htere to go back.
          </Link>
        </div>
      );
    return (
      <div>
        <h2>Day Details</h2>
        <Link to={"/set/" + this.props.match.params.system}>
          {"<<<"} Back to system dashboard
          {this.state.dirty ? " (does not save changes)" : ""}
        </Link>
        <br />
        <div>
          The day details settings for {this.props.match.params.system}/
          {this.date[0]}.<br />
          This form will allow you to set a date on this date.
        </div>
      </div>
    );
  }
}

export default SetDay;
