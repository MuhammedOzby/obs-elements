import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Drawer,
  Grid,
  Slider,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Link,
  Cast,
  Videocam,
  LinkOff,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function BottomNavbar() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const resolved = useLocation();
  const match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();
  const connectionStatus = useSelector(
    (state: RootState) => state.obsConnection.connectionStatus
  );

  return (
    <>
      <Button
        disabled={!connectionStatus}
        sx={{
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          bottom: "56px",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        onClick={() => setDrawerStatus(true)}
      >
        Sound Controls
      </Button>
      <BottomNavigation
        showLabels
        sx={{
          position: "fixed",
          bottom: "0",
          width: "100vw",
          left: "0",
          backgroundColor: "#f5f8ff",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        value={match?.pathname ? match.pathname : ""}
        onChange={(_e, newValue) => {
          navigate(`${newValue}`);
        }}
      >
        <BottomNavigationAction
          disabled={!connectionStatus}
          sx={{ ":disabled": { color: "#e8eef1" } }}
          value={"/"}
          label="Connection"
          icon={React.createElement(connectionStatus ? Link : LinkOff)}
        />
        <BottomNavigationAction
          disabled={!connectionStatus}
          sx={{ ":disabled": { color: "#e8eef1" } }}
          value={"/record"}
          label="Record"
          icon={<Videocam />}
        />
        <BottomNavigationAction
          disabled={!connectionStatus}
          sx={{ ":disabled": { color: "#e8eef1" } }}
          value={"/stream"}
          label="Stream"
          icon={<Cast />}
        />
      </BottomNavigation>
      <Drawer
        anchor="bottom"
        open={drawerStatus}
        onClose={() => setDrawerStatus(false)}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ width: "100%", padding: 2 }}>
          <Typography id="input-slider" gutterBottom>
            Volume
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider aria-label="Volume" step={1} />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}

export default BottomNavbar;
