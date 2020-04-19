import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { LoginContainer } from "./components/UsersContainer";
import store from "./redux/store";
import { ShowPosts } from "./components/ShowPosts";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    </div>
  );
}

export default App;
