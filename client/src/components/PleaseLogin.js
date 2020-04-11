import React from "react";

// reactstrap components
import { Container, NavLink } from "reactstrap";

function PleaseLogin() {
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
    <div className="page-header clear-filter">
      <div
        className="page-header-image"
        style={{
          backgroundImage:
            "url(" + require("../assets/img/atnighttown.jpeg") + ")"
        }}
        ref={pageHeader}
      ></div>
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">
            Please login if you want access other pages
          </h1>
          <h3>
            You can login by clicking{" "}
            <a key="1" href="/auth/login">
              here
            </a>
          </h3>
        </div>
      </Container>
    </div>
  );
}

export default PleaseLogin;
