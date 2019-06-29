import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Datemark from "./datemark";

import "../../styles/component/Calendar.css";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.system = this.props.system;
    let startdate = this.props.startdate || new Date();
    this.state = {
      year: startdate.getFullYear(),
      month: startdate.getMonth()
    };

    this.dateclicked = this.dateclicked.bind(this);
    this.BtnNextMo = this.BtnNextMo.bind(this);
    this.BtnPrevMo = this.BtnPrevMo.bind(this);
  }

  dateclicked = (number, month) => {
    let year = this.state.year;
    if (month !== this.state.month) {
      if (month === 0 && this.state.month === 11) year++;
      if (month === 11 && this.state.month === 0) year--;
    }
    this.props.onClick(year + "-" + (month + 1) + "-" + number);
  };

  BtnNextMo = () => {
    let nm = this.state.month + 1;
    let ny = this.state.year;
    if (nm < 0) {
      ny--;
      nm = 11;
    }
    if (nm > 11) {
      ny++;
      nm = 0;
    }
    this.setState({
      month: nm,
      year: ny
    });
  };

  BtnPrevMo = () => {
    let nm = this.state.month - 1;
    let ny = this.state.year;
    if (nm < 0) {
      ny--;
      nm = 11;
    }
    if (nm > 11) {
      ny++;
      nm = 0;
    }
    this.setState({
      month: nm,
      year: ny
    });
  };

  render() {
    let monthlength = new Date(
        this.state.year,
        this.state.month + 1,
        0
      ).getDate(),
      startday = new Date(this.state.year, this.state.month, 1).getDay();

    return (
      <div className="Calendar">
        <div className="CalHeader">
          <div className="CalPrev" onClick={this.BtnPrevMo}>
            &lt;==
          </div>
          <div className="CalTitle">
            {monthName[this.state.month]} <b>{this.state.year}</b>
          </div>
          <div className="CalNext" onClick={this.BtnNextMo}>
            ==&gt;
          </div>
        </div>
        <div className="CalBody">
          {[...Array(startday).keys()].map((comp, i) => {
            return (
              <Datemark
                LastMo="true"
                Date={
                  new Date(this.state.year, this.state.month, i + 1 - startday)
                }
              />
            );
          })}
          {[...Array(monthlength).keys()].map((comp, i) => {
            return (
              <Datemark
                Date={new Date(this.state.year, this.state.month, i + 1)}
              />
            );
          })}
          {[...Array(42 - monthlength - startday).keys()].map((comp, i) => {
            return (
              <Datemark
                NextMo="true"
                Date={
                  new Date(
                    this.state.year,
                    this.state.month,
                    monthlength + i + 1
                  )
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withFirebase(Calendar);
