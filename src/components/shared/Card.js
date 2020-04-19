import React, { Component } from "react";

export class Card extends Component {
  render = () => {
    const { children } = this.props;
    console.log("children are:", children);
    return (
      <div class="column">
        <div class="card">
          {/* <h3>Card 5</h3>
          <p>Some text</p>
          <p>Some text</p> */}
          {children}
        </div>
      </div>
    );
  };
}
