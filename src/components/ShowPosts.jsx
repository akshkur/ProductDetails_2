import React, { Component } from "react";
import { Loader } from "./shared/Loader";
///import { isEmpty } from "lodash";
import { Container, Col, Row, Accordion } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { map, take, times, findIndex, filter, isEmpty } from "lodash";
//import { Card } from "./shared/Card";
import "./ShowPosts.scss";
import Calendar from "react-calendar";
import {
  Card,
  Comment,
  Image,
  Icon,
  Modal,
  Button,
  Header,
  Divider,
  Form,
  ModalActions,
} from "semantic-ui-react";
import initialState from "../redux/initialState";
import DatePicker from "react-date-picker";
import { actions } from "../redux/Actions/userActions";
// require("bootstrap/less/bootstrap.less");

export class ShowPosts extends Component {
  static getDerivedStateFromProps(props, state) {
    let filteredProducts = { ...state.filteredProducts };
    if (props.products !== undefined) {
      filteredProducts = props.products;
    }
    return {
      filteredProducts: filteredProducts,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      todayPosted: [],
      filteredDate: new Date(),
      filteredProducts: [],
      likedByMe: false,
      modalOpen: false,
      modalCard: {},
      currentPage: 0,
      pageSize: 5,
      startIndex: 0,
      endIndex: 5,
    };
    this.textInput = React.createRef();
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  //event when we click on card to see the comments.
  handleClick(product) {
    this.setState({ modalCard: product, modalOpen: true });
  }

  //event to close the modal popup
  handleModalClick() {
    this.setState({ modalOpen: false });
  }

  //handler to view next comments.
  handleNextReplies() {
    const { endIndex } = this.state;
    this.setState({ startIndex: endIndex + 1, endIndex: endIndex + 5 });
  }

  //handler to view previous comments.
  handlePreviousReplies() {
    const { startIndex, endIndex } = this.state;
    this.setState({ startIndex: startIndex - 5, endIndex: endIndex - 5 });
  }

  //handler to capture like and unlike of products.
  handleLike(event, product) {
    event.stopPropagation();
    let { filteredProducts } = { ...this.state };
    const { actions } = this.props;
    let prods = [...filteredProducts];
    if (product.likedByMe) product.likes--;
    else product.likes++;
    let changedIndex = findIndex(prods, (prod) => {
      return prod.id === product.id;
    });
    prods[changedIndex].likes = product.likes;
    prods[changedIndex].likedByMe = !prods[changedIndex].likedByMe;

    actions.saveProducts(prods);
    this.setState({
      filteredProducts: prods,
    });
  }

  //Additional Feature: handler to capture replies.
  handleReply() {
    let { filteredProducts, modalCard } = this.state;
    const { actions } = this.props;

    let comment = { author: "You", text: this.textInput.current.value };
    let changedIndex = findIndex(filteredProducts, (prod) => {
      return prod.id === modalCard.id;
    });
    filteredProducts[changedIndex].comments.push(comment);
    actions.saveProducts(filteredProducts);
    this.textInput.current.value = "";
    this.setState({
      filteredProducts: filteredProducts,
    });
  }

  //handler to show liked products.
  handleLikedProducts() {
    const { filteredProducts } = this.state;
    let { actions } = this.props;

    actions.fetchLikedProducts(filteredProducts);
    this.setState({ filteredProducts: filteredProducts });
  }

  //filter handler to show date specific records.
  handleDateChange = (date) => {
    const { actions, products } = this.props;
    actions.fetchProducts(date);
    this.setState({ filteredDate: date, filteredProducts: products });
  };
  componentDidMount() {
    const { products } = this.props;
    this.props.actions.fetchProducts(new Date());
    this.setState({ todayPosted: products, filteredProducts: products });
  }
  render() {
    const {
      filteredDate,
      modalOpen,
      modalCard,
      filteredProducts,
      startIndex,
      endIndex,
    } = this.state;

    return (
      <div>
        <div className="container-fluid">
          <Row>
            <Accordion className="apply-date">Apply date Filter</Accordion>

            <DatePicker
              onChange={this.handleDateChange}
              value={filteredDate}
              minDate={new Date("01-01-1970")}
            ></DatePicker>
            <Col className="liked-products">
              <a href="#" onClick={this.handleLikedProducts.bind(this)}>
                See All My Liked Products
              </a>
            </Col>
          </Row>

          {filteredProducts.length === 0 && (
            <Row>
              <h2 className="error-box">No Records Found for this date.</h2>
            </Row>
          )}
          <Row>
            <Col>
              <Card.Group>
                {map(filteredProducts, (product) => {
                  return (
                    <Card
                      onClick={() => this.handleClick(product)}
                      key={product.id}
                    >
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                        />
                        <Card.Header>{product.productName}</Card.Header>
                        <Card.Description>
                          <Accordion className="product_description">
                            Product Description:
                          </Accordion>
                          <strong className="product_description_label">
                            {product.desc}
                          </strong>
                        </Card.Description>
                        {/* <p>You have {!product.likedByMe && "not"} Liked it.</p> */}
                      </Card.Content>
                      <Card.Content extra>
                        <p>
                          Likes are :{product.likes} (You have
                          {!product.likedByMe && " not"} liked it)
                        </p>
                        <Button
                          onClick={(event) => this.handleLike(event, product)}
                        >
                          <Icon
                            name={
                              !product.likedByMe
                                ? "thumbs up outline"
                                : "thumbs up"
                            }
                          />
                          Click here to like or Unlike
                        </Button>
                        <h4>Click on Card to see comments.</h4>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            </Col>
          </Row>
        </div>
        <Modal
          className="product-modal"
          closeIcon
          open={modalOpen}
          closeOnDimmerClick={true}
          onClose={this.handleModalClick.bind(this)}
        >
          <Modal.Header>Product Details and Comments</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            />
            <Modal.Description>
              <Header>{modalCard.productName}</Header>
              <p>{modalCard.desc}</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
            {/* <Divider vertical></Divider> */}
            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              {!isEmpty(modalCard) &&
                modalCard.comments
                  .slice(startIndex, endIndex)
                  .map((comment) => {
                    return (
                      <Comment>
                        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                        <Comment.Content>
                          <Comment.Author as="a">
                            {comment.author}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                          </Comment.Metadata>
                          <Comment.Text>{comment.text}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    );
                  })}

              <Modal.Actions>
                {startIndex > 1 && (
                  <a href="#" onClick={this.handlePreviousReplies.bind(this)}>
                    View Previous Replies.
                  </a>
                )}

                {!isEmpty(modalCard) && endIndex < modalCard.comments.length && (
                  <a href="#" onClick={this.handleNextReplies.bind(this)}>
                    View Next Replies.
                  </a>
                )}
              </Modal.Actions>
              {!isEmpty(modalCard) && modalCard["comments"].length > 0 && (
                <Form reply size="mini">
                  <input
                    className="input-text"
                    type="text"
                    ref={this.textInput}
                  />
                  <Button
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                    onClick={() => this.handleReply()}
                    primary
                  />
                </Form>
              )}
            </Comment.Group>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
