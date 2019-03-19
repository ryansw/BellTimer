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
    let data = this.data;
    console.log(this.data);
    this.newdata = {};
    this.newdata["Systems"] = {};
    this.newdata["Systems"][this.data.Path] = {
      Details: {
        Name: this.data.Name,
        Title: this.data.Name,
        Description: this.data.Description
      },
      Schedules: {},
      Events: {},
      Weekdays: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
      },
      Specials: {},
      Owner: 0,
      Editors: {}
    };
    for (let x of data.Schedules) {
      let data = { Title: x.DisplayName, Description: x.Description };
      this.newdata.Systems[this.data.Path].Schedules[x.Name] = data;
      data = {};
      for (let y of x.Events) {
        data[y.Name] = {
          Time: y.Time,
          Description: y.Description,
          Title: y.Name + " in",
          Bottom: y.Name + " at",
          Notice: y.Message
        };
      }
      this.newdata.Systems[this.data.Path].Events[x.Name] = data;
      if (x.Reason === 1) {
        if (x.WDays & (1 << 0))
          this.newdata.Systems[this.data.Path].Weekdays.Sunday = x.Name;
        if (x.WDays & (1 << 1))
          this.newdata.Systems[this.data.Path].Weekdays.Monday = x.Name;
        if (x.WDays & (1 << 2))
          this.newdata.Systems[this.data.Path].Weekdays.Tuesday = x.Name;
        if (x.WDays & (1 << 3))
          this.newdata.Systems[this.data.Path].Weekdays.Wednesday = x.Name;
        if (x.WDays & (1 << 4))
          this.newdata.Systems[this.data.Path].Weekdays.Thursday = x.Name;
        if (x.WDays & (1 << 5))
          this.newdata.Systems[this.data.Path].Weekdays.Friday = x.Name;
        if (x.WDays & (1 << 6))
          this.newdata.Systems[this.data.Path].Weekdays.Saturday = x.Name;
      }
      if (x.Reason === 2) {
        for (let y of x.Dates) {
          this.newdata.Systems[this.data.Path].Specials[y] = x.Name;
        }
      }
    }
    console.log(this.newdata);
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
        this.newdata:
        <br />
        <div style={{ wordWrap: "break-word" }}>
          {" "}
          {JSON.stringify(this.newdata)}{" "}
        </div>
      </div>
    );
  }
}

export default Player;
