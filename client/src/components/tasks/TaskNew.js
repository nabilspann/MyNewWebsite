import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, FormLabel, MenuItem } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { withRouter, Link } from "react-router-dom";
import { Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import * as actions from "../../actions";
// import { Form, FormGroup, Input, FormText, Button } from "reactstrap";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   margin: {
//     margin: theme.spacing(1)
//   },
//   withoutLabel: {
//     marginTop: theme.spacing(3)
//   },
//   textField: {
//     width: 200
//   }
// }));

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

const TaskNew = ({ addTask }) => {
  // const classes = useStyles();
  const { control, register, handleSubmit, errors } = useForm();
  const [status, setStatus] = React.useState("Start of development");

  // const handleChange = event => {
  //   console.log("test");
  //   setStatus(event.target.value);
  // };
  const onSubmit = data => {
    addTask(data);
    navigate("/issuetracker/tasks");
  };
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
              />
            }
            name="title"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
                // onChange={handleChange}
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
            defaultValue=""
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
          <Link to="../">
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
  // } else {
  //   return <Redirect to="/tasks" from="/tasks/:taskId" />;
  // }
};
// export default connect(null, actions)(withRouter(TaskNew));
export default connect(null, actions)(TaskNew);
