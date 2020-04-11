import React from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import { Router } from "@reach/router";

import LandingPageHeader from "./LandingPageHeader";
// import IndexNavbar from "./IndexNavbar";
import MainHeader from "./MainHeader";
// import { render } from "react-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Dashboard from "./Dashboard";
import TaskNew from "./tasks/TaskNew";
import EachTask from "./tasks/EachTask";
import PleaseLogin from "./PleaseLogin";
import Main from "./Main";

const App = props => {
  React.useEffect(() => {
    props.fetchUser();
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  console.log(props.auth);
  if (props.auth) {
    return (
      // <div className="container">
      //   <BrowserRouter>
      //     <div className="container">
      //       <MainHeader />
      //       {/* <div className="wrapper"> */}
      //       <Route exact path="/" component={LandingPageHeader} />
      //       <Route exact path="/tasks" component={Dashboard} />
      //       <Route exact path="/tasks/new" component={TaskNew} />
      //       <Route path="/tasks/:taskId" component={EachTask} />
      //       {/* </div> */}
      //     </div>
      //   </BrowserRouter>
      // </div>
      <div className="container">
        <MainHeader />
        <Router>
          <Main path="/" />
          <LandingPageHeader path="issuetracker" />
          <Dashboard path="issuetracker/tasks" />
          <TaskNew exact path="issuetracker/tasks/new" />
          <EachTask path="issuetracker/tasks/:taskId" />
          {/* </Dashboard> */}
          {/* <NotFound default /> */}
        </Router>
      </div>
    );
  } else {
    return (
      <div className="container">
        <MainHeader />
        <Router>
          <Main path="/" />
          <PleaseLogin default />
        </Router>
      </div>
    );
  }
};
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps, actions)(App);
// export default connect(null, actions)(App);
