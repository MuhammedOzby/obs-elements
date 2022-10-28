import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import { Link, Cast, Videocam, LinkOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

function BottomNavbar() {
  const [value, setValue] = React.useState("recents");
  const resolved = useLocation();
  const match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();
  const connectionStatus = useSelector(
    (state: RootState) => state.obsConnection.connectionStatus
  );

  return (
    <BottomNavigation
      showLabels
      sx={{
        position: "fixed",
        bottom: "0",
        width: "100vw",
        left: "0",
        backgroundColor: "#f5f8ff",
        boxShadow: "-1px -14px 97px 0px rgba(0,0,0,0.38);",
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
  );
}

export default BottomNavbar;
