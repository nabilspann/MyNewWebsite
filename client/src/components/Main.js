import React from "react";

// reactstrap components
import { Container, NavLink } from "reactstrap";
import GitHubIcon from "@material-ui/icons/GitHub";

import mainImage from "../assets/img/main.jpg";

const Main = props => {
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
    <>
      <div
        className=" page-header clear-filter"
        filter-color="blue"
        // style={{ marginTop: "64px" }}
        // className=" page-header"
      >
        <div
          className="page-header-image"
          // filter-color="blue"
          style={{
            backgroundImage: "url(" + require("../assets/img/main.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <h1 className="main-body h1-seo">Welcome to my website.</h1>
            <h3>
              I'm Nabil Spann, a developer using ReactJS and NodeJS to build web
              applications. Currently I have Issue Tracker project on this
              website to show case my skills. Please Check it out!
            </h3>

            <div>
              <NavLink href="https://github.com/nabilspann">
                <GitHubIcon className="iconlink" style={{ fontSize: "45px" }} />
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Main;
