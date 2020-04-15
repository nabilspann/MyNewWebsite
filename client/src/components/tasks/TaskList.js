import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import { Link } from "react-router-dom";
import { Link } from "@reach/router";

const TaskList = props => {
  const tasks = useSelector(tasks => tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  const renderTasks = () => {
    if (tasks.listTasks) {
      return tasks.listTasks.reverse().map(task => {
        // console.log(task);
        return (
          <Link
            key={task._id}
            to={`${task._id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              className="card"
              style={{ backgroundColor: "#87CEEB", marginBottom: "10px" }}
            >
              <CardContent>
                <Typography style={{ fontSize: "14px" }} color="textSecondary">
                  Title
                </Typography>
                <Typography variant="h5">{task.title}</Typography>
                <Typography style={{ fontSize: "14px" }} color="textSecondary">
                  Status
                </Typography>
                <Typography>{task.status}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      });
    }
  };

  return <div className="task-layout">{renderTasks()}</div>;
};
export default TaskList;
