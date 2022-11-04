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
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import OBS from "../lib/obs-interface";
import { OBSResponseTypes } from "obs-websocket-js";

function BottomNavbar() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const resolved = useLocation();
  const match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();
  const connectionStatus = useSelector(
    (state: RootState) => state.obsConnection.connectionStatus
  );
  const [volumeInfos, setVolumeInfos] = useState<{
    [key: string]: OBSResponseTypes["GetInputVolume"];
  }>({});

  const [statistics, setStatistics] = useState<OBSResponseTypes["GetStats"]>();

  setTimeout(async () => setStatistics(await OBS.call("GetStats")), 1000);

  return (
    <>
      <Button
        variant="contained"
        disabled={!connectionStatus}
        sx={{
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          bottom: "60px",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        onClick={GetVolumeState(setDrawerStatus, setVolumeInfos)}
      >
        Sound Controls
      </Button>
      <BottomNavigation
        showLabels
        sx={{
          position: "fixed",
          bottom: "10px",
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
        sx={{ width: "80%", padding: 2 }}
      >
        <Box sx={{ width: "90%", padding: 2 }}>
          {Object.entries(volumeInfos).map((data) => (
            <div key={data[0]}>
              <Typography id="input-slider" gutterBottom>
                {data[0]}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <VolumeUp />
                </Grid>
                <Grid item xs>
                  <Slider
                    aria-label="Volume"
                    defaultValue={data[1].inputVolumeDb}
                    marks={[
                      {
                        value: 0,
                        label: "Overload",
                      },
                    ]}
                    min={-100}
                    max={26}
                    valueLabelDisplay="on"
                    onChange={(elem, val, activeThumb) => {
                      OBS.call("SetInputVolume", {
                        inputName: data[0],
                        inputVolumeDb: typeof val == "number" ? val : 0,
                      });
                    }}
                  />
                </Grid>
                <Grid item>
                  <VolumeUp />
                </Grid>
              </Grid>
            </div>
          ))}
        </Box>
      </Drawer>
      <Box
        sx={{
          width: "100vw",
          position: "fixed",
          bottom: "0",
          height: "18px",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        {connectionStatus ? (
          <Typography variant="overline" sx={{ lineHeight: 0 }}>
            CPU: {statistics?.cpuUsage.toFixed(2)} - MEM:{" "}
            {statistics?.memoryUsage.toFixed(2)} - FPS:{" "}
            {statistics?.activeFps.toFixed(2)} - Skipped Frame: (Render:{" "}
            {statistics?.renderSkippedFrames} / Output:{" "}
            {statistics?.outputSkippedFrames})
          </Typography>
        ) : (
          "Not connected"
        )}
      </Box>
    </>
  );
}

export default BottomNavbar;

function GetVolumeState(
  setDrawerStatus: React.Dispatch<React.SetStateAction<boolean>>,
  setVolumeInfos: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { inputVolumeMul: number; inputVolumeDb: number };
    }>
  >
): React.MouseEventHandler<HTMLButtonElement> | undefined {
  return async () => {
    setDrawerStatus(true);
    const inputs = await OBS.call("GetSpecialInputs");
    const inputsGarage: {
      [key: string]: OBSResponseTypes["GetInputVolume"];
    } = {};
    for (const val of Object.values(inputs)) {
      if (val !== null) {
        inputsGarage[val] = await OBS.call("GetInputVolume", {
          inputName: val,
        });
      }
    }
    setVolumeInfos(inputsGarage);
  };
}
