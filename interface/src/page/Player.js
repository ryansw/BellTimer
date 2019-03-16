import React, { Component } from "react";
import testdata from "../testdata.json";

import muteicon from "../graphics/muteicon.svg";
import settingicon from "../graphics/settingicon.svg";

class Player extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.system === "test") this.data = testdata;
    this.update = this.update.bind(this);
    this.monospace_write = this.monospace_write.bind(this);
    this.update_font_settings = this.update_font_settings.bind(this);
    this.draw_canvas = this.draw_canvas.bind(this);
    this.updateinteval = 0;
    this.sizes = { max: 0 };
    this.font = "Monospace";
    this.dispdata = {
      daytype: "Regular Day",
      eventrem: "First Period Starts",
      timerem: "15:23",
      eventat: "First Period Starts at",
      timeat: "07:20:00",
      curtimet: "Current Time",
      curtime: "18:00:00"
    };
    this.abssize = [0, 0];
  }

  monospace_write = (text, x, y, size) => {
    this.ctx.font = size + "px " + this.font;
    let curx = x;
    for (let char of text) {
      if (this.sizes[char]) {
        this.ctx.fillText(char, curx + this.sizes[char] * size, y);
      } else this.ctx.fillText(char, curx, y);
      curx += this.sizes.max * size;
    }
  };

  update = () => {
    // console.log("Update called");
    this.inc++;
    //this.ctx.fillText("Hello, World! (canvas!)", 0, 50 + this.inc);
    if (
      this.abssize[0] !== document.documentElement.clientWidth ||
      this.abssize[1] !== document.documentElement.clientHeight
    )
      this.forceUpdate();
    this.draw_canvas();
  };

  update_font_settings = () => {
    this.ctx.font = "100px " + this.font;
    for (let x of [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ":",
      " "
    ]) {
      this.sizes[x] = this.ctx.measureText(x).width / 100;
      if (this.sizes[x] > this.sizes.max) this.sizes.max = this.sizes[x];
    }
    for (let x of [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ":",
      " "
    ]) {
      this.sizes[x] = (this.sizes.max - this.sizes[x]) / 2;
    }
  };

  draw_canvas = () => {
    let ctx = this.ctx,
      height = this.canvas.height,
      width = this.canvas.width,
      mwidth = width - 40,
      hwidth = width / 2,
      mhwidth = hwidth - 200;
    ctx.clearRect(0, 0, width, height);
    let fontsize = height / 5;
    // ctx.fillText("01:12:58", 0, 50);
    // this.monospace_write("01:12:58", 0, 100, 10);

    //  Draw the day type
    let fnum = fontsize / 3;
    ctx.font = fnum + "px " + this.font;
    ctx.fillText(
      this.dispdata.daytype,
      width - ctx.measureText(this.dispdata.daytype).width,
      fnum
    );

    //  Draw central timer
    fnum = mwidth / this.dispdata.timerem.length / this.sizes.max;
    if (fnum > fontsize * 2.5) fnum = fontsize * 2.5;
    this.monospace_write(
      this.dispdata.timerem,
      (width - fnum * this.sizes.max * this.dispdata.timerem.length) / 2,
      fontsize * 3,
      fnum
    );
    ctx.font = 100 + "px " + this.font;
    fnum = (100 / ctx.measureText(this.dispdata.eventrem).width) * mwidth;
    if (fnum > (fontsize * 2) / 3) fnum = (fontsize * 2) / 3;
    ctx.font = fnum + "px " + this.font;
    ctx.fillText(
      this.dispdata.eventrem,
      (width - ctx.measureText(this.dispdata.eventrem).width) / 2,
      fontsize * 1
    );

    //  Draw event at and current time displays
    let fnum1 = mhwidth / this.dispdata.timeat.length / this.sizes.max;
    let fnum2 = mhwidth / this.dispdata.curtime.length / this.sizes.max;
    fnum = Math.min(fnum1, fnum2);
    if (fnum > fontsize) fnum = fontsize;
    this.monospace_write(
      //Event at display
      this.dispdata.timeat,
      (hwidth - fnum * this.sizes.max * this.dispdata.timeat.length) / 2,
      fontsize * 4.9,
      fnum
    );
    this.monospace_write(
      //Current time display
      this.dispdata.curtime,
      hwidth +
        (hwidth - fnum * this.sizes.max * this.dispdata.curtime.length) / 2,
      fontsize * 4.9,
      fnum
    );

    // Draw event start text and current time text
    ctx.font = 100 + "px " + this.font;
    fnum1 = (100 / ctx.measureText(this.dispdata.eventat).width) * mhwidth;
    fnum2 = (100 / ctx.measureText(this.dispdata.curtimet).width) * mhwidth;
    fnum = Math.min(fnum1, fnum2);
    if (fnum > (fontsize * 2) / 3) fnum = (fontsize * 2) / 3;
    ctx.font = fnum + "px " + this.font;
    ctx.fillText(
      //Event at text
      this.dispdata.eventat,
      (hwidth - ctx.measureText(this.dispdata.eventat).width) / 2,
      fontsize * 3.9
    );
    ctx.fillText(
      // Current time text
      this.dispdata.curtimet,
      hwidth + (hwidth - ctx.measureText(this.dispdata.curtimet).width) / 2,
      fontsize * 3.9
    );
  };

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.update_font_settings();
    this.draw_canvas();
    this.updateinteval = setInterval(this.update, 200);
  }

  componentWillUnmount() {
    clearInterval(this.updateinteval);
    console.log("reset");
  }

  render() {
    this.abssize = [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ];
    return (
      <div
        className="Player"
        style={{
          padding: 0,
          margin: 0,
          overflow: "hidden",
          height: "100vh",
          width: "100vw"
        }}
      >
        <canvas
          ref="canvas"
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
          style={{ padding: 0, margin: 0 }}
        />
      </div>
    );
  }
}

export default Player;
