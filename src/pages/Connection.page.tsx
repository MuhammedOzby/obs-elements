import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { RootState, store } from "../store/store";
import { connect, ConnectedProps } from "react-redux";
import { setConnectionInfo } from "../store/connectionInfo.slice";

const mapState = (state: RootState) => ({
  obsConnection: state.obsConnection,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

class PageConnection extends Component<PropsFromRedux> {
  render() {
    return (
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "50px",
          "& .MuiTextField-root": { mt: 2 },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Connection info:
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              store.dispatch(
                setConnectionInfo({
                  ipAddress: e.currentTarget["ip-address"].value,
                  password: e.currentTarget.password.value,
                  port: e.currentTarget.port.value,
                })
              );
            }}
          >
            <TextField
              fullWidth
              required
              name="ip-address"
              id="ip-address"
              label="IP address"
              placeholder="192.168.1.124"
              defaultValue={this.props.obsConnection.ipAddress}
            />
            <TextField
              fullWidth
              required
              name="port"
              id="port"
              label="Port number"
              placeholder="4455"
              defaultValue={this.props.obsConnection.port}
            />
            <TextField
              fullWidth
              required
              name="password"
              id="password"
              label="Password"
              type={"password"}
              defaultValue={this.props.obsConnection.password}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Connect
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default connector(PageConnection);
