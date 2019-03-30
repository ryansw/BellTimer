import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../component/Firebase";

class SetSchedule extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.state = {
      ready: false,
      valid: false
    };

    // DB interaction functions
    this.onSchedulesDetailsChange = this.onSchedulesDetailsChange.bind(this);

    // DB interaction setup
    this.SchedulesDetailsRef = this.firebase.getSchedulesDetailsRef(
      this.props.match.params.system
    );
    this.SchedulesDetailsRef.on("value", this.onSchedulesDetailsChange);
  }

  onSchedulesDetailsChange = details => {
    
  };

  componentWillUnmount() {
    // Clear the callback refs
    this.SchedulesDetailsRef.off();
  }

  render() {
    if (!this.state.ready) return <div>Waiting for data...</div>;
    if (!this.state.valid) return <div>Invalid Schedule Selected</div>;
    return (
      <div>
        <h2>Schedule Details</h2>
        <Link to={"/set/" + this.props.match.params.system}>
          {"<<<"} Back to system dashboard
          {this.state.dirty ? " (does not save changes)" : ""}
        </Link>
        <br />
        The schedule details settings for {this.props.match.params.system}/
        {this.props.match.params.schedule}.<br />
      </div>
    );
  }
}

export default withFirebase(SetSchedule);
