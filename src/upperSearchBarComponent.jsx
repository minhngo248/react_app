import React, { Component } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import GetAnimes from "./getAnimes";
import Autocomplete from "react-autocomplete";

class UpperSearchBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFilm: Object(),
      value: "",
    };
    this._mounted = false;
  }

  componentDidMount() {
    if (this._mounted) return;
    var getAni = new GetAnimes();
    getAni.getData().then((d) => {
      var list = [];
      for (var ind in d) {
        list.push({ name: d[ind].itemLabel.value });
      }
      this.setState({
        jsonFilm: list,
      });
    });
    this._mounted = true;
  }

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
    var getAni = new GetAnimes();
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
              <Form className="d-block">
                <Autocomplete
                  value={this.state.value}
                  inputProps={{ id: "search_name_anime" }}
                  wrapperStyle={{
                    position: "relative",
                    display: "inline-block",
                  }}
                  items={this.state.jsonFilm}
                  getItemValue={(item) => item.name}
                  shouldItemRender={getAni.matchFilm}
                  onChange={(event, value) => this.setState({ value })}
                  onSelect={(value) => this.setState({ value })}
                  renderMenu={(children) => (
                    <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{ maxHeight: '100px', maxWidth: '160px' }}
                      navbarScroll>{children}</Nav>
                  )}
                  renderItem={(item, isHighlighted) => (
                    <div className={`item ${isHighlighted ? "item-highlighted" : ""}`}>
                      {item.name}
                    </div>
                  )}
                />

                <Button
                  variant="outline-success"
                  onClick={this.handleSearchButton}
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default UpperSearchBarComponent;
