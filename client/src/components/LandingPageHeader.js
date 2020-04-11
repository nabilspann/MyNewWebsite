import React from "react";
import { Link, Router } from "@reach/router";

// reactstrap components
import { Container } from "reactstrap";

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <div className="page-header clear-filter" filter-color="blue">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + require("../assets/img/header.jpg") + ")"
        }}
        ref={pageHeader}
      ></div>
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo main-body ">Welcome to Issue Tracker</h1>
          <h3>This project allows people to track any issues or tasks.</h3>
          <h4>
            <Link to="tasks" className="link">
              My Tasks
            </Link>
          </h4>
        </div>
      </Container>
    </div>
  );
}

export default LandingPageHeader;
