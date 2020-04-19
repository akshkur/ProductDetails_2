import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ShowPosts } from "./ShowPosts";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// middleware
const middleware = [thunk]; // add your middleware like `redux-thunk`
// mock store
const mockStore = configureStore(middleware);
// store
const store = mockStore({ reducer });

describe("ShowPosts Component", () => {
  it("should match stored snapshot", () => {
    const component = shallow(
      //   <Provider store={store}>
      //     <Router history={history}>
      <ShowPosts />
      //     </Router>
      //   </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
