import React, { Component } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";

class UpperSearchBarComponent extends Component {
  state = {};

  handleSearchButton() {
    const nameAnime = document.getElementById("search_name_anime").value;
    const dateFrom = "1900-01-01";
    var today = new Date();
    const dateTo =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    window.location.assign(
      encodeURI(
        `/searchedResult?name=${nameAnime}&director=&dateFrom=${dateFrom}&dateTo=${dateTo}`
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
              <Nav.Link href="/topRating">Ranking</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  id="search_name_anime"
                />
                <Button variant="outline-success" onClick={this.handleSearchButton}>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default UpperSearchBarComponent;
