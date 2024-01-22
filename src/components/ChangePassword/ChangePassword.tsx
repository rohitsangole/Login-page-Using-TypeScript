import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#ffffff",
      color: "#0c0b0b",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

//state type

type State = {
  username: string;
  currentPassword: string;
  newPassword:string;
  conformNewPassword:string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: "",
  currentPassword: "",
  newPassword:"",
  conformNewPassword:"",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setcurrentPassword"; payload: string }
  | { type: "setnewPassword"; payload: string }
  | { type: "setconformNewPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "passwordNotMatched"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setcurrentPassword":
      return {
        ...state,
        currentPassword: action.payload,
      };
      case "setnewPassword":
      return {
        ...state,
        newPassword: action.payload,
      };
      case "setconformNewPassword":
      return {
        ...state,
        conformNewPassword: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
      case "passwordNotMatched":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.currentPassword.trim() &&state.newPassword.trim() &&state.conformNewPassword.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.currentPassword,state.newPassword,state.conformNewPassword]);

  const handleLogin = () => {
    if (state.username === "abc@email.com" && state.currentPassword === "password") {
     if(state.newPassword === state.conformNewPassword){
        dispatch({
            type: "loginSuccess",
            payload: "Password Update Successfully",
          });
     }
     else{
        dispatch({
            type: "passwordNotMatched",
            payload: "Password Not Matched",
          });
     }
        
    } else {

      dispatch({
        type: "loginFailed",
        payload: "Incorrect username or password",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handleCurrentPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setcurrentPassword",
      payload: event.target.value,
    });
  };
  const handleNewPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setnewPassword",
      payload: event.target.value,
    });
  };

  const handleConformPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setconformNewPassword",
      payload: event.target.value,
    });
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Change Password" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
               <TextField
              error={state.isError}
              fullWidth
              id="currentPassword"
              type="password"
              label="Current Password"
              placeholder="Current Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handleCurrentPasswordChange}
              onKeyPress={handleKeyPress}
            />
               <TextField
              error={state.isError}
              fullWidth
              id="newPassword"
              type="password"
              label="New Password"
              placeholder="New Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handleNewPasswordChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="conformNewPassword"
              type="password"
              label="Conform New Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handleConformPasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
