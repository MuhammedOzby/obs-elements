import {
  Cast,
  Videocam,
  Link,
  LinkOff,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import obs from "../lib/obs-interface";
import { RootState } from "../store/store";

function RightStatusBarComponent() {
  const [fullScreen, setFullScreen] = useState(false);
  const recordState = useSelector(
    (state: RootState) => state.obsConnection.recordState
  );
  const streamState = useSelector(
    (state: RootState) => state.obsConnection.streamState
  );
  const connectionStatus = useSelector(
    (state: RootState) => state.obsConnection.connectionStatus
  );

  return (
    <Box
      sx={{
        width: "50px",
        maxHeight: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        backgroundColor: "white",
        boxShadow: "-2px 1px 3px 0px rgba(0,0,0,0.2)",
        borderBottomLeftRadius: "5px",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {React.createElement(connectionStatus ? Link : LinkOff, {
                color: connectionStatus ? "success" : "error",
              })}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => obs.call("ToggleRecord")}
            disabled={!connectionStatus}
          >
            <ListItemIcon>
              <Videocam
                color={recordState.outputActive ? "success" : "error"}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => obs.call("ToggleStream")}
            disabled={!connectionStatus}
          >
            <ListItemIcon>
              <Cast color={streamState.outputActive ? "success" : "error"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (!fullScreen) {
                document.querySelector("body")?.requestFullscreen();
                setFullScreen(true);
              } else {
                document.exitFullscreen();
                setFullScreen(false);
              }
            }}
          >
            <ListItemIcon>
              {React.createElement(!fullScreen ? Fullscreen : FullscreenExit)}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default RightStatusBarComponent;
