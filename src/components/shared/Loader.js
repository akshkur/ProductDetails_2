import React, { Component } from "react";
import "./Loader.scss";

export class Loader extends Component {
  render() {
    const { hidden } = this.props;

    return (
      <div>
        <div hidden={hidden} class="loader"></div>
      </div>
    );
  }
}
