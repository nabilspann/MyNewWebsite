import React from "react";
// import { Link } from "react-router-dom";

import {
  Collapse,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
  // UncontrolledTooltip
  // Button
  // Row,
  // Col
} from "reactstrap";
import { connect } from "react-redux";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Icon } from "@material-ui/core";

const MainHeader = props => {
  // const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // React.useEffect(() => {
  //   const updateNavbarColor = () => {
  //     if (
  //       document.documentElement.scrollTop > 399 ||
  //       document.body.scrollTop > 399
  //     ) {
  //       setNavbarColor("");
  //     } else if (
  //       document.documentElement.scrollTop < 400 ||
  //       document.body.scrollTop < 400
  //     ) {
  //       setNavbarColor("navbar-transparent");
  //     }
  //   };
  //   window.addEventListener("scroll", updateNavbarColor);
  //   return function cleanup() {
  //     window.removeEventListener("scroll", updateNavbarColor);
  //   };
  // });
  // console.log(props);
  function renderContent() {
    switch (props.auth) {
      case null:
        return;
      case false:
        return (
          // <li>
          <NavLink key="1" href="/auth/login">
            Login
          </NavLink>
          // </li>
        );
      default:
        return [
          // <li key="1">{/* <Payments /> */}</li>,
          // <li key="3" style={{ margin: "0 10px" }}>
          //   Credits: {this.props.auth.credits}
          // </li>,
          // <li key="2">
          <NavLink key="1" href="/api/logout">
            Logout
          </NavLink>
          // </li>
        ];
    }
  }
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="bg-info" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="/">
              <HomeOutlinedIcon
                style={{ marginRight: "4px", fontSize: "30px" }}
              />
              Home
            </NavbarBrand>
            <NavbarBrand href="/issuetracker">
              <AssignmentOutlinedIcon
                style={{ marginRight: "4px", fontSize: "30px" }}
              />
              IssueTracker
            </NavbarBrand>
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
              type="button"
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav
              // className="ml-auto"
              navbar
            >
              <NavItem>{renderContent()}</NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MainHeader);
