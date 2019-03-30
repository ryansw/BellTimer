import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Calendar from "../component/Calendar";

class SetSystem extends Component {
  constructor(props) {
    super(props);
    this.system = this.props.match.params.system;
    this.state = {
      redirect: null
    };

    this.calendarday = this.calendarday.bind(this);
  }

  calendarday = datecode => {
    this.setState({
      redirect: "/set/" + this.system + "/date/" + datecode
    });
  };

  render() {
    if (this.state.redirect !== null)
      return <Redirect to={this.state.redirect} />;
    return (
      <div>
        <h2>System Dashboard</h2>
        The system dashboard for {this.props.match.params.system}.<br />
        <Link to="/set">
          Return to user dashboard (this will be in the navigation eventually)
        </Link>
        <br />
        Click a date here to set an event for a day.
        <Calendar onClick={this.calendarday} />
      </div>
    );
  }
}

export default SetSystem;
