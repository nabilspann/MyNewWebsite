import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "@reach/router";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import TaskList from "./tasks/TaskList";

const Dashboard = () => {
  return (
    <div>
      <TaskList />
      <div style={{ float: "right" }}>
        <Link to="new">
          <Tooltip title="Add New Tasks">
            <AddIcon style={{ fontSize: "50px" }} />
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
