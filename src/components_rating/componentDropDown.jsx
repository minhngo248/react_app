import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class ComponentDropDown extends Component {
  state = {};
  render() {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/topRating">Top rating</Dropdown.Item>
            <Dropdown.Item href="/topBoxOffice">Top box office</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default ComponentDropDown;
