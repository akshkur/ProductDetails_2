import React, { Component } from "react";
import UsersList from "./UsersList";
import Login from "./Login";
import { selectors as loginSelectors } from "../redux/Reducers/userReducer";
import { actions } from "../redux/Actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loader } from "./shared/Loader";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
import { ShowPosts } from "./ShowPosts";

export class UsersContainer extends Component {
  componentDidUpdate() {
    //this.props.history.push("/users");
    console.log(this.props);
  }
  render() {
    const { loading, errorMessage } = this.props;
    return (
      <div>
        <Loader hidden={!loading} />
        {/* I have made Loader Component which 
      we can call here to show loader based 
      on value of loading variable when we embed API instance.*/}
        <ShowPosts {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: loginSelectors.getLoading(state),
  errorMessage: loginSelectors.getErrorMessage(state),
  products: loginSelectors.getProducts(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
