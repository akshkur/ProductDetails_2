import React, { Component } from "react";
import "./Login.scss";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";

class Login extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log(props.loading);
    return {
      loading: props.loading,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
    this.props.history.push("/login");
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    console.log(event.target.value);
  }
  handleSubmit(e) {
    const { email, password } = this.state;
    const { actions, history } = this.props;
    actions.userLogin(email, password, history);
    console.log(this.props);
  }
  render() {
    const { handleSubmit } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <table className="login">
          <tbody>
            <tr>
              <td>
                <input
                  type="email"
                  className="email"
                  placeholder="Email"
                  value={email ? email : ""}
                  name="email"
                  onChange={this.handleChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="submit"
                  className="send"
                  onClick={this.handleSubmit.bind(this)}
                  //onMouseEnter={this.handleSubmit.bind(this)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {!isEmpty(this.props.errorMessage) && (
          <div className="error-message">
            SignIn failed due to reason:{this.props.errorMessage}
          </div>
        )}
      </div>
    );
  }
}
export default Login;
