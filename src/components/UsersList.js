import React, { Component } from "react";
import { map, filter, isEmpty } from "lodash";
import { Card } from "./shared/Card";
import "./UsersList.scss";
class UsersList extends Component {
  static getDerivedStateFromProps(props, state) {
    const { isFilterApplied } = state;
    let usersList = [];
    usersList = props.users;

    console.log("usera", usersList);
    return {
      usersList: usersList,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      age_lt: 0,
      age_gt: 0,
      lengthUserName: 0,
      usersList: props.users,
      isFilterApplied: false,
    };
    // const history = useHistory();
    // history.push("/");
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    // this.props.history.push("/users");
  }
  filterData() {
    const { age_lt, age_gt, lengthUserName } = this.state;
    let { users } = this.props;

    for (var i = 0; i < users.length; i++) {
      if (!isEmpty(age_lt)) {
        users = filter(users, (user) => {
          return user.age <= age_lt;
        });
      }
      if (!isEmpty(age_gt)) {
        users = filter(users, (user) => {
          return user.age >= age_gt;
        });
      }
      if (!isEmpty(lengthUserName)) {
        users = filter(users, (user) => {
          return user.accountId.length >= lengthUserName;
        });
      }
    }
    console.log("filtered users are:", users);
    this.setState({ usersList: users, isFilterApplied: true });
  }

  resetFilters() {
    const { users } = this.props;
    this.setState({
      usersList: users,
      age_gt: 0,
      age_lt: 0,
      lengthUserName: 0,
      isFilterApplied: false,
    });
  }

  handleFilterChange(event) {
    const { age_lt, age_gt, lengthUserName } = this.state;
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    console.log(event);
  }
  render() {
    const { age_lt, age_gt, lengthUserName, usersList } = this.state;
    return (
      <div>
        <table className="table-users">
          <tbody>
            <tr>
              <td>
                <p className="table-users__age">Age:</p>
              </td>
              <td>
                <p>Less Than</p>
                <input
                  type="text"
                  name="age_lt"
                  value={age_lt == 0 ? "" : age_lt}
                  onChange={this.handleFilterChange}
                />
              </td>

              <td>
                <p>AND</p>
              </td>
              <td>
                <p>Greater Than</p>
                <input
                  type="text"
                  name="age_gt"
                  value={age_gt == 0 ? "" : age_gt}
                  onChange={this.handleFilterChange}
                />
              </td>
              <td>
                <p>AND</p>
              </td>
              <td>
                <p>Length of name:</p>

                <input
                  className="table-users__name"
                  type="text"
                  name="lengthUserName"
                  value={lengthUserName == 0 ? "" : lengthUserName}
                  onChange={this.handleFilterChange}
                />
              </td>
              <td>
                <input
                  className="btnApply"
                  type="Button"
                  value="Apply Filter"
                  onClick={this.filterData.bind(this)}
                />
              </td>
              <td>
                <input
                  className="btnReset"
                  type="Button"
                  value="Reset Filter"
                  onClick={this.resetFilters.bind(this)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {!isEmpty(usersList) && !usersList.length && <h4>No Records Found.</h4>}

        <div class="usersrow">
          {map(usersList, (user) => {
            console.log("user is:", user);
            return (
              <Card>
                <table>
                  <tr>
                    <td>
                      <h3>AccountId : </h3>
                    </td>
                    <td>
                      <h3>{user.accountId}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Age: </h3>
                    </td>
                    <td>
                      <p>{user.age}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>FirstName: </h3>
                    </td>
                    <td>
                      <p>{user.firstName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>LastName: </h3>
                    </td>
                    <td>
                      <p>{user.lastName}</p>
                    </td>
                  </tr>
                </table>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UsersList;
