import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Datemark from "./datemark";

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
  }

  componentWillReceiveProps(newprops) {}

  dateclicked = (number, current) => {
    if (!current) {
      let nm = this.state.month;
      let ny = this.state.year;
      if (number < 7) nm++;
      else nm--;
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
    }
  };

  render() {
    let monthlength = new Date(
        this.state.year,
        this.state.month + 1,
        0
      ).getDate(),
      startday = new Date(this.state.year, this.state.month, 1).getDay(),
      rows = Math.ceil((monthlength + startday) / 7),
      pmonthlength = new Date(this.state.year, this.state.month, 0).getDate();
    let dates = [];
    for (let row = 0; row < rows; row++) {
      let roww = [];
      for (let col = 0; col < 7; col++) {
        let c = {
          current: true,
          number: col + row * 7 - startday + 1
        };
        if (c.number > monthlength)
          c = {
            current: false,
            number: c.number % monthlength
          };
        if (c.number < 1)
          c = {
            current: false,
            number: c.number + pmonthlength
          };
        roww.push(c);
      }
      dates.push(roww);
    }
    console.log(monthlength, startday, rows, dates);
    return (
      <div className="Calendar">
        {monthName[this.state.month]} {this.state.year}
        <table>
          <tbody>
            {dates.map((comp, i) => {
              return (
                <tr key={"Calrow" + i}>
                  {comp.map((comp, j) => {
                    return (
                      <td key={"Calcol" + i + "," + j}>
                        <Datemark {...comp} onClick={this.dateclicked} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withFirebase(Calendar);
