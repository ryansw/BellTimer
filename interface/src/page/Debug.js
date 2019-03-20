import React, { Component } from "react";
import { withFirebase } from "../component/Firebase";
import { Link } from "react-router-dom";

class Player extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.systemName = this.props.match.params.system;
    this.scheduleName = this.props.match.params.schedule;

    this.update = this.update.bind(this);
    this.changed_schedule = this.changed_schedule.bind(this);
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

    // State setup
    this.state = {
      details_ready: false,
      schedules_ready: false,
      title: "Waiting for data",
      schedules: [],
      events: []
    };

    // DB interaction functions
    this.onDetailChange = this.onDetailChange.bind(this);
    this.onSchedulesDetailsChange = this.onSchedulesDetailsChange.bind(this);
    this.onScheduleEventsChange = this.onScheduleEventsChange.bind(this);

    // DB interaction setup
    this.DetailsRef = this.firebase.getSystemDetailsRef(
      this.props.match.params.system
    );
    this.DetailsRef.on("value", this.onDetailChange);

    this.SchedulesDetailsRef = this.firebase.getSchedulesDetailsRef(
      this.props.match.params.system
    );
    this.SchedulesDetailsRef.on("value", this.onSchedulesDetailsChange);

    this.ScheduleEventsRef = this.firebase.getScheduleEventsRef(
      this.systemName,
      this.scheduleName
    );
    this.ScheduleEventsRef.on("value", this.onScheduleEventsChange);
  }

  onDetailChange = details => {
    if (details.exists()) {
      this.setState({
        title: details.val().Title
      });
    } else
      this.setState({
        title: "Not available."
      });
  };

  onSchedulesDetailsChange = schedules => {
    let scheduledetails = [];
    for (let a in schedules.val()) {
      let o = schedules.val()[a];
      o.Name = a;
      scheduledetails.push(o);
    }
    this.setState({
      schedules: scheduledetails
    });
  };

  onScheduleEventsChange = events => {
    let eventdetails = [];
    for (let a in events.val()) {
      let o = events.val()[a];
      o.Name = a;
      eventdetails.push(o);
    }
    this.setState({
      events: eventdetails.sort((a, b) => {
        return a.Time > b.Time;
      })
    });
  };

  update = () => {
    // console.log("Update called");
  };

  componentDidMount() {
    this.updateinteval = setInterval(this.update, 200);
  }

  componentWillUnmount() {
    // Clear the updater loop
    clearInterval(this.updateinteval);
    console.log("test");
    // Clear the callback refs
    this.DetailsRef.off();
    this.SchedulesDetailsRef.off();
    this.ScheduleEventsRef.off();
  }

  changed_schedule = () => {
    this.ScheduleEventsRef.off();
    this.scheduleName = this.props.match.params.schedule;
    this.ScheduleEventsRef = this.firebase.getScheduleEventsRef(
      this.systemName,
      this.scheduleName
    );
    this.ScheduleEventsRef.on("value", this.onScheduleEventsChange);
  };

  render() {
    return (
      <div className="Debug">
        <b>{this.props.match.params.system}</b>
        <br />
        <b>{this.props.match.params.schedule}</b>
        <br />
        <b>{this.state.title}</b>
        <br />
        <div id="schedule_links">
          {this.state.schedules.map(
            function(comp, i) {
              return (
                <span>
                  <Link
                    to={"/debug/" + this.systemName + "/" + comp.Name}
                    key={"Schedule" + i}
                    onClick={this.changed_schedule}
                  >
                    {comp.Name}
                  </Link>
                  <br />
                </span>
              );
            }.bind(this)
          )}
        </div>
        <br />
        <div id="events">
          {this.state.events.map(
            function(comp, i) {
              console.log(comp);
              return (
                <span>
                  {comp.Name}
                  <br />
                </span>
              );
            }.bind(this)
          )}
        </div>
      </div>
    );
  }
}

export default withFirebase(Player);
