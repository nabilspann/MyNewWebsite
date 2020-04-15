import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, navigate } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Button,
  CardContent,
  Card,
  TextField,
  FormLabel,
  MenuItem
} from "@material-ui/core";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import {
  fetchSingleTask,
  deleteSingleTask,
  editSingleTask
} from "../../actions";
// import { Link } from "react-router-dom";

const statuses = [
  {
    value: "Start of development",
    label: "Start of development"
  },
  {
    value: "In development",
    label: "In development"
  },
  {
    value: "Finished product",
    label: "Finished product"
  }
];

const EachTask = props => {
  const task = useSelector(tasks => tasks.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, errors } = useForm();
  const [status, setStatus] = React.useState("Start of development");
  const handleChange = event => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchSingleTask(props.taskId));
  }, [isEditing, dispatch, props.taskId]);

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  const deleteTask = () => {
    dispatch(deleteSingleTask(props.taskId));
    navigate("/issuetracker/tasks");
  };

  const editTask = data => {
    // console.log(data);
    dispatch(editSingleTask(props.taskId, data));

    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    if (task.currentTask) {
      return (
        <div>
          <Link to={"../"}>
            <ArrowBackRoundedIcon
              style={{ fontSize: "40px", color: "skyblue" }}
            />
          </Link>
          <Card className="card">
            <CardContent>
              <Typography variant="h3">{task.currentTask.title}</Typography>
              <Typography style={{ fontSize: "14px" }} color="textSecondary">
                Description
              </Typography>
              <Typography>{task.currentTask.description}</Typography>
              <Typography style={{ fontSize: "14px" }} color="textSecondary">
                Status
              </Typography>
              <Typography>{task.currentTask.status}</Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Edit/Delete
          </Button>
        </div>
      );
    } else {
      return <div>content not found</div>;
    }
  };

  const renderForm = () => {
    if (task.currentTask) {
      return (
        <div>
          <form>
            {/* Title section of input */}
            <div className="form">
              <Controller
                as={
                  <TextField
                    id="standard-basic"
                    label="Title"
                    ref={register({ required: true })}
                    style={{ width: "70%" }}
                    // defaultValue="Test"
                  />
                }
                name="title"
                control={control}
                defaultValue={task.currentTask.title}
                rules={{ required: true }}
              />
              <div className="formError">
                {errors.title && <FormLabel>This field is required</FormLabel>}
              </div>
            </div>

            {/* Description section of input */}
            <div className="form">
              <Controller
                as={
                  <TextField
                    id="description"
                    label="Description"
                    ref={register({ required: true })}
                    style={{ width: "70%" }}
                    multiline
                    rows="4"
                    variant="filled"
                  />
                }
                name="description"
                control={control}
                defaultValue={task.currentTask.description}
                rules={{ required: true }}
              />
              <div className="formError">
                {errors.description && (
                  <FormLabel>This field is required</FormLabel>
                )}
              </div>
            </div>

            {/* Status section of input */}
            <div className="form">
              <Controller
                as={
                  <TextField
                    id="task status"
                    select
                    label="Select"
                    value={status}
                    onChange={handleChange}
                    helperText="Please select the status"
                    style={{ width: "35%" }}
                  >
                    {statuses.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                name="status"
                control={control}
                defaultValue={task.currentTask.status}
                rules={{ required: true }}
              />
              <div className="formError">
                {errors.description && (
                  <FormLabel>Please select one of the statuses</FormLabel>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div style={{ display: "block" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(editTask)}
              >
                Submit
              </Button>

              <Button variant="outlined" color="primary" onClick={handleClick}>
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={deleteTask}
                style={{ float: "right" }}
              >
                Delete
              </Button>
              {/* </Link> */}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button> */}
            </div>
          </form>
        </div>
      );
    }
  };

  if (!isEditing) {
    return <div className="task-layout">{renderContent()}</div>;
  } else {
    if (task.currentTask) {
      return <div className="task-layout">{renderForm()}</div>;
    }
  }
};
export default EachTask;
