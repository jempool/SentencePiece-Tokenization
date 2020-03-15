import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      //width: 400,
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }
}));

function App() {
  const classes = useStyles();
  const inputRef = useRef();
  const [selectionStart, setSelectionStart] = useState();
  const [outputText, setOutputText] = useState(['ho', 'la']);

  const updateSelectionStart = () =>
    setSelectionStart(inputRef.current.selectionStart);

  function insertTag(event, name) {
    let inputAsArray = inputRef.current.value.split("");
    inputAsArray[selectionStart] = name === "sep" ? " <sep>" : " <cls>";
    inputRef.current.value = inputAsArray.join("");
  }

  function onClick() {
    let data = inputRef.current.value;
    axios
      .post("http://127.0.0.1:5000/", data, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json"
        }
      })
      .then(res => {
        let payload = JSON.stringify(Object.values(res)[0]);
        payload = payload.replace(/,/g, ",  ");
        setOutputText(payload);
      })
      .catch(error => console.log(error))
  }


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Tokenization of Tweets
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid item xs={5} style={{ paddingTop: 60 }}>
          {/* selectionStart: {selectionStart} */}
          <Button
            variant="outlined"
            color="primary"
            onClick={event => insertTag(event, "sep")}
          >
            {"<sep>"}
          </Button>{" "}
          <Button
            onClick={event => insertTag(event, "cls")}
            variant="outlined"
            color="primary"
          >
            {"<cls>"}
          </Button>
          <br />
          <br />
          <Paper className={classes.paper}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-multiline-static"
                rows="15"
                variant="outlined"
                label="Paste your text here"
                multiline
                fullWidth={true}
                rowsMax="180"
                onSelect={updateSelectionStart}
                inputRef={inputRef}
              />
            </form>
          </Paper>
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onClick}
          >
            Send
          </Button>
        </Grid>

        <ArrowForwardIcon color="primary" />

        <Grid item xs={5} style={{ paddingTop: 60 }}>
          <Paper className={classes.paper}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-multiline-static"
                rows="15"
                variant="outlined"
                // label="Tokenized tweet"
                disabled
                multiline
                fullWidth={true}
                rowsMax="180"
                value={outputText}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
